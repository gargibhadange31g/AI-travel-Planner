import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSignup = async () => {
    if (!name || !email || !password) {
      alert('Please fill in all fields!')
      return
    }

    setLoading(true)
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', {
        name, email, password
      })
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      navigate('/')
    } catch (error) {
      alert(error.response?.data?.message || 'Something went wrong!')
    }
    setLoading(false)
  }
useEffect(() => {
  document.body.classList.add('inner-page')
  return () => document.body.classList.remove('inner-page')
}, [])
  return (
    <div className="container">
      <h1>📝 Create Account</h1>
      <div className="form">
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleSignup} disabled={loading}>
          {loading ? '⏳ Creating account...' : '📝 Sign Up'}
        </button>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  )
}

export default Signup