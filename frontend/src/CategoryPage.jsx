import { useParams, useNavigate, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
const categoryData = {
  adventure: {
    title: 'Adventure Travel 🏔️',
    subtitle: 'Push your limits — one destination at a time',
    heroImg: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1400&q=80',
    countries: [
      {
        country: '🇳🇵 Nepal',
        cuisine: 'Everest Base Camp Trek',
        description: 'Nepal is the ultimate adventure destination. Home to 8 of the world\'s 14 highest peaks, trekking here is a life-changing experience.',
        img: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&q=80'
      },
      {
        country: '🇳🇿 New Zealand',
        cuisine: 'Bungee Jumping & Skydiving',
        description: 'New Zealand is the adventure capital of the world. From bungee jumping in Queenstown to skydiving over glaciers, the thrills never stop.',
        img: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=600&q=80'
      },
      {
        country: '🇨🇭 Switzerland',
        cuisine: 'Skiing & Mountain Hiking',
        description: 'Switzerland offers world class skiing, paragliding over the Alps, and breathtaking hiking trails that will leave you speechless.',
        img: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=600&q=80'
      },
      {
        country: '🇵🇪 Peru',
        cuisine: 'Machu Picchu Trek',
        description: 'Trek the legendary Inca Trail to Machu Picchu through cloud forests and ancient ruins. One of the greatest adventures on earth.',
        img: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=600&q=80'
      },
      {
        country: '🇮🇸 Iceland',
        cuisine: 'Northern Lights & Glaciers',
        description: 'Iceland is a land of fire and ice. Chase the Northern Lights, hike on glaciers, and explore volcanic landscapes unlike anywhere else.',
        img: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600&q=80'
      },
    ]
  },
  relaxing: {
    title: 'Relaxing Travel 🏖️',
    subtitle: 'Unwind and recharge — your calm awaits',
    heroImg: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1400&q=80',
    countries: [
      {
        country: '🇲🇻 Maldives',
        cuisine: 'Overwater Bungalows & Beaches',
        description: 'The Maldives is pure paradise. Crystal clear lagoons, white sand beaches and luxurious overwater bungalows make it the ultimate relaxation destination.',
        img: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&q=80'
      },
      {
        country: '🇮🇩 Bali',
        cuisine: 'Spa, Yoga & Rice Terraces',
        description: 'Bali is the island of gods and healing. World class spas, yoga retreats, and stunning rice terraces create the perfect escape from everyday life.',
        img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80'
      },
      {
        country: '🇬🇷 Santorini',
        cuisine: 'Sunsets & Mediterranean Bliss',
        description: 'Santorini is pure romance and relaxation. Watch the world famous sunset over the caldera, sip local wine and let the Mediterranean breeze calm your soul.',
        img: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&q=80'
      },
      {
        country: '🇹🇭 Thailand',
        cuisine: 'Beach Resorts & Island Hopping',
        description: 'Thailand\'s islands offer the perfect tropical escape. From Koh Samui to Phuket, pristine beaches and luxury resorts await at every turn.',
        img: 'https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?w=600&q=80'
      },
      {
        country: '🇲🇺 Mauritius',
        cuisine: 'Lagoons & Luxury Resorts',
        description: 'Mauritius is a jewel in the Indian Ocean. Turquoise lagoons, lush mountains, and world class resorts make it one of the most relaxing places on earth.',
        img: 'https://images.unsplash.com/photo-1504457047772-27faf1c00561?w=600&q=80'
      },
    ]
  },
  cultural: {
    title: 'Cultural Travel 🏛️',
    subtitle: 'Discover heritage — explore the world\'s history',
    heroImg: 'https://images.unsplash.com/photo-1555993539-1732b0258235?w=1400&q=80',
    countries: [
      {
        country: '🇮🇹 Italy',
        cuisine: 'Rome, Vatican & Renaissance Art',
        description: 'Italy is an open air museum. From the Colosseum to the Vatican, Florence\'s Renaissance art to Venice\'s canals — every corner tells a story thousands of years old.',
        img: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&q=80'
      },
      {
        country: '🇯🇵 Japan',
        cuisine: 'Temples, Geisha & Traditions',
        description: 'Japan is a perfect blend of ancient and modern. Explore thousand year old temples, witness traditional tea ceremonies, and experience a culture unlike any other.',
        img: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80'
      },
      {
        country: '🇮🇳 India',
        cuisine: 'Taj Mahal, Forts & Festivals',
        description: 'India is a land of ancient civilizations. From the Taj Mahal to Rajasthan\'s majestic forts, colorful festivals and diverse traditions make India endlessly fascinating.',
        img: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&q=80'
      },
      {
        country: '🇪🇬 Egypt',
        cuisine: 'Pyramids, Pharaohs & History',
        description: 'Egypt is where history was born. Stand in awe before the Great Pyramids of Giza, explore ancient temples along the Nile, and unravel 5000 years of civilization.',
        img: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73a0e?w=600&q=80'
      },
      {
        country: '🇬🇷 Greece',
        cuisine: 'Ancient Ruins & Mythology',
        description: 'Greece is the birthplace of Western civilization. Walk through the Acropolis, explore ancient Olympia, and discover the myths and legends that shaped our world.',
        img: 'https://images.unsplash.com/photo-1555993539-1732b0258235?w=600&q=80'
      },
    ]
  },
  nature: {
    title: 'Nature Travel 🌿',
    subtitle: 'Embrace the wild — reconnect with nature',
    heroImg: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1400&q=80',
    countries: [
      {
        country: '🇧🇷 Brazil',
        cuisine: 'Amazon Rainforest & Wildlife',
        description: 'The Amazon is the lungs of the earth. Explore the world\'s largest rainforest, spot exotic wildlife, and navigate mighty rivers through an ecosystem like no other.',
        img: 'https://images.unsplash.com/photo-1518182170546-07661fd94144?w=600&q=80'
      },
      {
        country: '🇰🇪 Kenya',
        cuisine: 'Safari & Wildlife',
        description: 'Kenya is the ultimate safari destination. Witness the Great Migration, spot the Big Five, and experience the raw beauty of the African savanna.',
        img: 'https://images.unsplash.com/photo-1547970810-dc1eac37d174?w=600&q=80'
      },
      {
        country: '🇮🇸 Iceland',
        cuisine: 'Waterfalls, Geysers & Volcanoes',
        description: 'Iceland is nature at its most dramatic. Thundering waterfalls, erupting geysers, active volcanoes and the magical Northern Lights create an unforgettable experience.',
        img: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600&q=80'
      },
      {
        country: '🇨🇦 Canada',
        cuisine: 'Banff, Rockies & Northern Lights',
        description: 'Canada\'s wilderness is breathtaking. From Banff\'s turquoise lakes to the vast Rocky Mountains and the dancing Northern Lights — nature here is truly majestic.',
        img: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?w=600&q=80'
      },
      {
        country: '🇳🇿 New Zealand',
        cuisine: 'Fjords, Forests & Landscapes',
        description: 'New Zealand looks like it was designed by a movie set designer. Dramatic fjords, ancient forests, and jaw dropping landscapes make it a nature lover\'s paradise.',
        img: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=600&q=80'
      },
    ]
  },
  nightlife: {
    title: 'Nightlife Travel 🎉',
    subtitle: 'Live the night — the world comes alive after dark',
    heroImg: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1400&q=80',
    countries: [
      {
        country: '🇪🇸 Ibiza, Spain',
        cuisine: 'World Class Clubs & Beach Parties',
        description: 'Ibiza is the nightlife capital of the world. Legendary clubs, world famous DJs, and beach parties that last till sunrise make it the ultimate party destination.',
        img: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=80'
      },
      {
        country: '🇹🇭 Bangkok',
        cuisine: 'Street Parties & Rooftop Bars',
        description: 'Bangkok never sleeps. From rooftop bars with stunning skyline views to vibrant street parties and night markets — the city transforms after dark.',
        img: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=600&q=80'
      },
      {
        country: '🇦🇪 Dubai',
        cuisine: 'Luxury Clubs & Sky High Bars',
        description: 'Dubai\'s nightlife is as extravagant as the city itself. Ultra luxury clubs, sky high rooftop bars and glamorous beach clubs define the Dubai night experience.',
        img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80'
      },
      {
        country: '🇺🇸 Las Vegas',
        cuisine: 'Casinos, Shows & Pool Parties',
        description: 'Las Vegas is the entertainment capital of the world. World class shows, legendary casinos, celebrity chef restaurants and epic pool parties never stop.',
        img: 'https://images.unsplash.com/photo-1605833556294-ea5c7a74f57d?w=600&q=80'
      },
      {
        country: '🇩🇪 Berlin',
        cuisine: 'Techno Clubs & Underground Scene',
        description: 'Berlin has the most legendary underground club scene in the world. Berghain, Tresor and dozens of iconic venues keep the city dancing for days.',
        img: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600&q=80'
      },
    ]
  },
}

function CategoryPage() {
  const { category } = useParams()
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user'))
  const data = categoryData[category]

  if (!data) {
    return (
      <div style={{ color: '#fff', textAlign: 'center', padding: '100px' }}>
        <h2>Category not found!</h2>
        <button onClick={() => navigate('/')}>Go Home</button>
      </div>
    )
  }

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
      <div className="category-hero" style={{ backgroundImage: `url(${data.heroImg})` }}>
        <div className="category-hero-overlay"></div>
        <div className="category-hero-content">
          <div className="category-tag">Explore by Experience</div>
          <h1>{data.title}</h1>
          <p>{data.subtitle}</p>
        </div>
      </div>

      {/* ZIGZAG COUNTRIES */}
      <div className="blurred-section">
        <div className="blurred-content">
          <div className="section-title" style={{ textAlign: 'center' }}>Top Destinations</div>
          <div className="section-subtitle" style={{ textAlign: 'center' }}>Pick your next adventure</div>

          <div className="zigzag-container">
            {data.countries.map((item, index) => (
              <div key={index} className={`zigzag-item ${index % 2 === 0 ? 'zigzag-left' : 'zigzag-right'}`}>
                <div className="food-flashcard">
                  <img src={item.img} alt={item.cuisine} />
                  <div className="food-flashcard-body">
                    <div className="food-cuisine">{item.cuisine}</div>
                    <div className="food-description">{item.description}</div>
                  </div>
                </div>
                <div className="food-card-footer">
                  <div className="food-country">{item.country}</div>
                  <button
                    className="food-trip-btn"
                    onClick={() => navigate('/planner', {
                      state: { destination: item.country.split(' ')[1], tripType: category }
                    })}
                  >
                    Plan a Trip →
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

export default CategoryPage