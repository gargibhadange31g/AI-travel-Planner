import { useState ,useEffect } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Please fill in all fields!')
      return
    }

    setLoading(true)
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email, password
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
      <h1>🔐 Login</h1>
      <div className="form">
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
        <button onClick={handleLogin} disabled={loading}>
          {loading ? '⏳ Logging in...' : '🔐 Login'}
        </button>
        <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
      </div>
    </div>
  )
}

export default Login