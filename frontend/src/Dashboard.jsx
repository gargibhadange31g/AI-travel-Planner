import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const [trips, setTrips] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (!token) {
      navigate('/login')
      return
    }
    fetchTrips()
  }, [])

  const fetchTrips = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/trips/mytrips', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setTrips(response.data)
    } catch (error) {
      console.error(error)
    }
    setLoading(false)
  }

  const deleteTrip = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/trips/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setTrips(trips.filter(trip => trip._id !== id))
    } catch (error) {
      console.error(error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }
useEffect(() => {
  document.body.classList.add('inner-page')
  return () => document.body.classList.remove('inner-page')
}, [])
useEffect(() => {
  document.body.classList.add('inner-page')
  return () => document.body.classList.remove('inner-page')
}, [])
  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>🗺️ My Trips</h1>
        <div>
          <span>👋 {user?.name}</span>
          <button onClick={handleLogout} style={{ marginLeft: '10px' }}>Logout</button>
          <button onClick={() => navigate('/')} style={{ marginLeft: '10px' }}>➕ New Trip</button>
        </div>
      </div>

      {loading ? (
        <p>Loading your trips...</p>
      ) : trips.length === 0 ? (
        <p>No trips saved yet! Go plan one 🌍</p>
      ) : (
        trips.map(trip => (
          <div key={trip._id} className="itinerary">
            <h2>📍 {trip.destination}</h2>
            <p>📅 {trip.days} days | 💰 ₹{trip.budget} | 🎯 {trip.tripType}</p>
            <pre>{trip.itinerary}</pre>
            <button onClick={() => deleteTrip(trip._id)}>🗑️ Delete Trip</button>
          </div>
        ))
      )}
    </div>
  )
}

export default Dashboard