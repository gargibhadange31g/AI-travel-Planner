import { BrowserRouter, Routes, Route, useNavigate, Link } from 'react-router-dom'
import Login from './Login'
import Signup from './Signup'
import Dashboard from './Dashboard'
import Planner from './Planner'
import FoodPage from './FoodPage'
import CategoryPage from './CategoryPage'
import './App.css'

const categories = [
  { name: 'Food', sub: 'Savor the world', path: '/category/food', img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80' },
  { name: 'Adventure', sub: 'Seek the thrill', path: '/category/adventure', img: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&q=80' },
  { name: 'Relaxing', sub: 'Find your calm', path: '/category/relaxing', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80' },
  { name: 'Cultural', sub: 'Discover heritage', path: '/category/cultural', img: 'https://images.unsplash.com/photo-1555993539-1732b0258235?w=400&q=80' },
  { name: 'Nature', sub: 'Embrace nature', path: '/category/nature', img: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&q=80' },
{ name: 'Nightlife', sub: 'Live the night', path: '/category/nightlife', img: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&q=80' },
]

const destinations = [
  { city: 'India', tagline: 'Land of Diversity', img: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&q=80' },
  { city: 'Paris, France', tagline: 'City of Love', img: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&q=80' },
  { city: 'Tokyo, Japan', tagline: 'Where tradition meets future', img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&q=80' },
  { city: 'Bali, Indonesia', tagline: 'Island of Gods', img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=80' },
  { city: 'Santorini, Greece', tagline: 'Heaven on Earth', img: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&q=80' },
  { city: 'Dubai, UAE', tagline: 'City of the Future', img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80' },
  { city: 'New York, USA', tagline: 'The City That Never Sleeps', img: 'https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=400&q=80' },
  { city: 'Switzerland', tagline: 'Land of the Alps', img: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=400&q=80' },
  { city: 'Maldives', tagline: 'Paradise on Earth', img: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400&q=80' },
]
function Home() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user'))

  return (
    <div>
      {/* NAVBAR */}
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

      {/* HERO */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>"Collect moments,<br /><em>not things."</em></h1>
          <p>Travel. Explore. Live.</p>
          <button className="hero-btn" onClick={() => navigate('/planner')}>
            ✈ Plan My Trip
          </button>
        </div>
        <div className="scroll-indicator">
          <span>Scroll to explore</span>
          <div className="scroll-arrow">↓</div>
        </div>
      </section>

      {/* EVERYTHING BELOW HERO */}
      <div className="blurred-section">

        {/* EXPERIENCE CATEGORIES */}
        <div className="blurred-content" style={{ paddingTop: '20px' }}>
          <div className="section-title">Explore by experience</div>
          <div className="section-subtitle">What kind of traveler are you?</div>
          <div className="category-scroll">
            {categories.map((cat) => (
              <div
                key={cat.name}
                className="cat-card-img"
                onClick={() => navigate(cat.path)}
              >
                <img src={cat.img} alt={cat.name} />
                <div className="cat-img-overlay"></div>
                <div className="cat-img-info">
                  <div className="cat-name">{cat.name}</div>
                  <div className="cat-sub">{cat.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DESTINATION SLIDESHOW */}
        <div className="blurred-content" style={{ paddingTop: 0 }}>
          <div className="section-title">Trending destinations</div>
          <div className="section-subtitle">Where will you go next?</div>
          <div className="slideshow-wrapper">
            <div className="slideshow-track">
              {[...destinations, ...destinations].map((dest, i) => (
                <div key={i} className="dest-card">
  <img src={dest.img} alt={dest.city} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
  <div className="dest-overlay"></div>
  <div className="dest-info">
    <div className="dest-city">{dest.city}</div>
    <div className="dest-tagline">{dest.tagline}</div>
  </div>
</div>
              ))}
            </div>
          </div>
        </div>

        {/* PLAN MY TRIP BUTTON */}
        <div className="blurred-content" style={{ textAlign: 'center', paddingTop: '20px' }}>
          <button
            className="plan-btn"
            style={{ width: 'auto', padding: '16px 48px', fontSize: '18px', borderRadius: '30px' }}
            onClick={() => navigate('/planner')}
          >
            ✈ Plan My Trip with AI
          </button>
        </div>

        {/* FOOTER */}
        <div className="footer">
          Travelora — Your journey starts here ✈ &nbsp;|&nbsp; Built with ❤️ using React & AI
        </div>

      </div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/planner" element={<Planner />} />
        <Route path="/category/food" element={<FoodPage />} />
        <Route path="/category/:category" element={<CategoryPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App