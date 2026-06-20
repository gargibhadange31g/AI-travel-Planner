import { useNavigate, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
const foodCountries = [
  {
    country: '🇮🇹 Italy',
    cuisine: 'Pizza, Pasta & Gelato',
    description: 'Italy is a food lovers paradise. From wood-fired Neapolitan pizza to handmade pasta and creamy gelato, every meal is a celebration of flavor and tradition.',
    img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80'
  },
  {
    country: '🇯🇵 Japan',
    cuisine: 'Sushi, Ramen & Tempura',
    description: 'Japanese cuisine is an art form. Experience the delicate balance of fresh sushi, rich ramen broths, and perfectly crispy tempura in every bite.',
    img: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&q=80'
  },
  {
    country: '🇹🇭 Thailand',
    cuisine: 'Pad Thai, Curry & Street Food',
    description: 'Thailand is the street food capital of the world. Bold flavors, aromatic spices, and vibrant colors make Thai cuisine one of the most loved in the world.',
    img: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=600&q=80'
  },
  {
    country: '🇲🇽 Mexico',
    cuisine: 'Tacos, Guacamole & Enchiladas',
    description: 'Mexican food is a fiesta for your taste buds. From smoky tacos al pastor to fresh guacamole and rich mole sauces, every bite tells a story.',
    img: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&q=80'
  },
  {
    country: '🇮🇳 India',
    cuisine: 'Biryani, Curry & Street Food',
    description: 'Indian cuisine is a symphony of spices. From fragrant biryani to creamy butter chicken and crispy chaat, India offers the most diverse food culture in the world.',
    img: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80'
  },
  {
    country: '🇫🇷 France',
    cuisine: 'Croissants, Cheese & Fine Dining',
    description: 'France is the home of fine dining. Buttery croissants, hundreds of cheese varieties, and Michelin star restaurants make France the culinary capital of the world.',
    img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80'
  },
]

function FoodPage() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user'))
useEffect(() => {
  document.body.classList.add('inner-page')
  return () => document.body.classList.remove('inner-page')
}, [])
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
      <div className="category-hero" style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1400&q=80)'
      }}>
        <div className="category-hero-overlay"></div>
        <div className="category-hero-content">
          <div className="category-tag">Explore by Experience</div>
          <h1>Food Travel 🍕</h1>
          <p>Taste the world — one destination at a time</p>
        </div>
      </div>

      {/* FOOD COUNTRIES ZIGZAG */}
      <div className="blurred-section">
        <div className="blurred-content">
          <div className="section-title" style={{ textAlign: 'center' }}>Famous Food Destinations</div>
          <div className="section-subtitle" style={{ textAlign: 'center' }}>Discover the world through its flavours</div>

          <div className="zigzag-container">
            {foodCountries.map((item, index) => (
              <div key={index} className={`zigzag-item ${index % 2 === 0 ? 'zigzag-left' : 'zigzag-right'}`}>

                {/* FLASHCARD */}
                <div className="food-flashcard">
                  <img src={item.img} alt={item.cuisine} />
                  <div className="food-flashcard-body">
                    <div className="food-cuisine">{item.cuisine}</div>
                    <div className="food-description">{item.description}</div>
                  </div>
                </div>

                {/* BELOW CARD — country + button */}
                <div className="food-card-footer">
                  <div className="food-country">{item.country}</div>
                  <button
                    className="food-trip-btn"
                    onClick={() => navigate('/planner', { state: { destination: item.country.split(' ')[1], tripType: 'Food' } })}
                  >
                    Plan a Food Trip →
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>

        <div className="footer">
          Travelora — Your journey starts here ✈ &nbsp;|&nbsp; Built with ❤️ using React & AI
        </div>
      </div>
    </div>
  )
}

export default FoodPage