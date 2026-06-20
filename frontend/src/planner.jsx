import { useState, useEffect } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import Groq from 'groq-sdk'
import axios from 'axios'

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true
})

const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY
console.log('Unsplash key:', UNSPLASH_KEY)

async function fetchLocationPhoto(locationName, destination) {
  const cleanName = locationName.split('-')[0].split(',')[0].trim().split(' ').slice(0, 3).join(' ')

  // Try specific location first
  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(cleanName)}&per_page=1&client_id=${UNSPLASH_KEY}`
    )
    if (res.ok) {
      const data = await res.json()
      if (data.results?.[0]?.urls?.regular) {
        return data.results[0].urls.regular
      }
    }
  } catch {}

  // Fallback to destination city
  try {
    const res2 = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(destination)}&per_page=1&client_id=${UNSPLASH_KEY}`
    )
    if (res2.ok) {
      const data2 = await res2.json()
      if (data2.results?.[0]?.urls?.regular) {
        return data2.results[0].urls.regular
      }
    }
  } catch {}

  // Final fallback Wikipedia
  try {
    const wikiRes = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(destination)}`
    )
    if (wikiRes.ok) {
      const wikiData = await wikiRes.json()
      if (wikiData.thumbnail?.source) {
        return wikiData.thumbnail.source
      }
    }
  } catch {}

  return null
}
function parseItinerary(text) {
  const days = []
  const splits = text.split(/(?=Day\s*\d+)/i)

  splits.forEach(section => {
    if (!section.trim()) return
    const lines = section.trim().split('\n').filter(l => l.trim())
    if (lines.length === 0) return

    const title = lines[0].trim()
    const activities = []

    lines.slice(1).forEach(line => {
      const clean = line.replace(/[*#]/g, '').trim()
      if (clean.length > 5) activities.push(clean)
    })

    days.push({ title, activities })
  })

  return days
}

function extractLocations(activities, destination) {
  const locations = []
  const timeLabels = ['Morning', 'Afternoon', 'Evening', 'Night']

  activities.forEach((activity, i) => {
    const timeLabel = timeLabels[i] || `Stop ${i + 1}`
    const colonIdx = activity.indexOf(':')
    let content = colonIdx !== -1 ? activity.slice(colonIdx + 1).trim() : activity

    const locationMatch = content.match(/visit\s+([^,.(]+)|explore\s+([^,.(]+)|go\s+to\s+([^,.(]+)|at\s+([^,.(]+)|([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*(?:\s+(?:Beach|Temple|Fort|Market|Museum|Park|Lake|Falls|Church|Palace|Garden|Tower|Arch|Cave|Island))?)/i)

    const locationName = locationMatch
      ? (locationMatch[1] || locationMatch[2] || locationMatch[3] || locationMatch[4] || locationMatch[5] || '').trim()
      : destination

    if (content.length > 10) {
      locations.push({
        time: timeLabel,
        activity: content,
        locationName: locationName || destination,
        searchQuery: `${locationName || destination} ${destination}`
      })
    }
  })

  return locations
}

function TimelineCard({ location, index, destination }) {
  const [photo, setPhoto] = useState(null)
  const [photoLoading, setPhotoLoading] = useState(true)

  useEffect(() => {
    fetchLocationPhoto(location.searchQuery, destination).then(url => {
      setPhoto(url)
      setPhotoLoading(false)
    })
  }, [location.searchQuery])

  const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(location.locationName + ' ' + destination)}`

  return (
    <div className="timeline-item">
      <div className="timeline-marker">
        <div className="timeline-number">{index + 1}</div>
        <div className="timeline-line"></div>
      </div>

      <div className="timeline-card">
        <div className="timeline-time">
          🕐 {location.time}
        </div>

        {photoLoading ? (
          <div className="timeline-photo-loading">Loading photo...</div>
        ) : photo ? (
          <img src={photo} alt={location.locationName} className="timeline-photo" />
        ) : (
          <div className="timeline-photo-placeholder">📍 {location.locationName}</div>
        )}

        <div className="timeline-card-body">
          <div className="timeline-top-row">
            <div className="timeline-location-name">📍 {location.locationName}</div>
          </div>
          <div className="timeline-activity">{location.activity}</div>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="maps-btn"
          >
            🗺️ Explore on Maps →
          </a>
        </div>
      </div>
    </div>
  )
}
function DaySection({ day, index, destination }) {
  const [expanded, setExpanded] = useState(true)
  const locations = extractLocations(day.activities, destination)

  return (
    <div className="day-section-wrapper">
      <div className="day-header" onClick={() => setExpanded(!expanded)}>
        <div className="day-badge">Day {index + 1}</div>
        <div className="day-header-title">
          {day.title.replace(/Day\s*\d+[-:\s]*/i, '').trim() || 'Itinerary'}
        </div>
        <div className="day-toggle">{expanded ? '▲' : '▼'}</div>
      </div>

      {expanded && (
        <div className="timeline-container">
          {locations.length > 0 ? (
            locations.map((loc, i) => (
              <TimelineCard
                key={i}
                location={loc}
                index={i}
                destination={destination}
              />
            ))
          ) : (
            <div className="timeline-raw">
              {day.activities.map((a, i) => (
                <div key={i} className="timeline-raw-item">• {a}</div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function Planner() {
  const location = useLocation()
  const prefill = location.state || {}

  const [destination, setDestination] = useState(prefill.destination || '')
  const [days, setDays] = useState('')
  const [budget, setBudget] = useState('')
  const [tripType, setTripType] = useState(prefill.tripType || 'Cultural')
  const [itinerary, setItinerary] = useState('')
  const [parsedDays, setParsedDays] = useState([])
  const [loading, setLoading] = useState(false)
  const [suggestions, setSuggestions] = useState([])
const [showSuggestions, setShowSuggestions] = useState(false)
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user'))

  const handleSubmit = async () => {
    if (!destination || !days || !budget) {
      alert('Please fill in all fields!')
      return
    }
    setLoading(true)
    setItinerary('')
    setParsedDays([])
    try {
      const response = await groq.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages: [{
          role: 'user',
          content: `Plan a ${days} day ${tripType} trip to ${destination} with a budget of ₹${budget}.
Give a detailed day-by-day itinerary. Use this exact format:

Day 1 - Area Name
Morning: Visit [Specific Place Name] - description and cost
Afternoon: Lunch at [Restaurant Name], then visit [Place Name] - cost
Evening: Visit [Place Name] or dinner at [Restaurant Name] - cost
Hotel: [Hotel Name] - ₹cost per night

Day 2 - Area Name
Morning: ...

Use specific real place names. No markdown, no asterisks, no hashtags. Include costs in ₹.`
        }]
      })
      const text = response.choices[0].message.content
      setItinerary(text)
      setParsedDays(parseItinerary(text))
    } catch (error) {
      alert('Something went wrong!')
      console.error(error)
    }
    setLoading(false)
  }

  const handleSaveTrip = async () => {
    if (!token) {
      alert('Please login to save trips!')
      navigate('/login')
      return
    }
    try {
      await axios.post('http://localhost:5000/api/trips/save', {
        destination, days, budget, tripType, itinerary
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      alert('Trip saved! ✅')
    } catch (error) {
      alert('Something went wrong while saving!')
    }
  }
  const handleDestinationChange = async (value) => {
  setDestination(value)
  if (value.length < 2) {
    setSuggestions([])
    return
  }
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(value)}&format=json&limit=6&featuretype=city`
    )
    const data = await res.json()
    const cities = data.map(item => {
      const parts = item.display_name.split(',')
      return parts.slice(0, 3).join(',').trim()
    })
    const unique = [...new Set(cities)]
    setSuggestions(unique)
    setShowSuggestions(true)
  } catch {
    setSuggestions([])
  }
}

const handleSelectSuggestion = (suggestion) => {
  setDestination(suggestion.split(',')[0].trim())
  setSuggestions([])
  setShowSuggestions(false)
}
useEffect(() => {
  document.body.classList.add('inner-page')
  return () => document.body.classList.remove('inner-page')
}, [])
  return (
    <div>
      <nav className="navbar">
        <div className="navbar-logo">Travelora ✈</div>
        <div className="navbar-links">
          <Link to="/">Home</Link>
          {token ? (
            <>
              <span style={{ color: '#fff', opacity: 0.9 }}>👋 {user?.name}</span>
              <Link to="/dashboard">My Trips</Link>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup" className="signup-btn">Sign Up</Link>
            </>
          )}
        </div>
      </nav>

      <div className="blurred-section">
        <div className="blurred-content" style={{ paddingTop: '100px' }}>

          <div className="form-section">
            <h2>✈ Plan your dream trip with AI</h2>
            <div className="form-grid">
             <div style={{ position: 'relative' }}>
  <input
    className="form-input"
    type="text"
    placeholder="Where do you want to go? (e.g. Paris)"
    value={destination}
    onChange={(e) => handleDestinationChange(e.target.value)}
    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
    style={{ width: '100%' }}
  />
  {showSuggestions && suggestions.length > 0 && (
    <div className="suggestions-dropdown">
      {suggestions.map((suggestion, i) => (
        <div
          key={i}
          className="suggestion-item"
          onMouseDown={() => handleSelectSuggestion(suggestion)}
        >
          📍 {suggestion}
        </div>
      ))}
    </div>
  )}
</div>
              <input
                className="form-input"
                type="number"
                placeholder="How many days?"
                value={days}
                onChange={(e) => setDays(e.target.value)}
              />
              <input
                className="form-input"
                type="number"
                placeholder="Your budget in ₹"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />
              <select
                className="form-input"
                value={tripType}
                onChange={(e) => setTripType(e.target.value)}
              >
                <option>Cultural</option>
                <option>Adventure</option>
                <option>Relaxing</option>
                <option>Food</option>
                <option>Nature</option>
                <option>Nightlife</option>
              </select>
            </div>
            <button className="plan-btn" onClick={handleSubmit} disabled={loading}>
              {loading ? '⏳ Planning your trip...' : '✈ Plan My Trip with AI'}
            </button>
          </div>

          {loading && (
            <div style={{ textAlign: 'center', color: '#fff', marginTop: '40px' }}>
              <div style={{ fontSize: '40px', marginBottom: '16px' }}>✈️</div>
              <div style={{ fontSize: '18px' }}>AI is planning your perfect trip...</div>
              <div style={{ fontSize: '14px', opacity: 0.7, marginTop: '8px' }}>This takes about 10-15 seconds</div>
            </div>
          )}

          {parsedDays.length > 0 && (
            <div style={{ marginTop: '32px' }}>
              <div className="section-title" style={{ marginBottom: '8px' }}>
                🗺️ Your {days} Day {tripType} Trip to {destination}
              </div>
              <div className="section-subtitle" style={{ marginBottom: '24px' }}>
                Budget: ₹{budget} | Click any day to expand/collapse
              </div>

              {parsedDays.map((day, index) => (
                <DaySection
                  key={index}
                  day={day}
                  index={index}
                  destination={destination}
                />
              ))}

              <button className="save-btn" style={{ marginTop: '24px' }} onClick={handleSaveTrip}>
                💾 Save Trip
              </button>
            </div>
          )}

        </div>

        <div className="footer">
          Travelora — Your journey starts here ✈ &nbsp;|&nbsp; Built with ❤️ using React & AI
        </div>
      </div>
    </div>
  )
}

export default Planner