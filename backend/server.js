const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const authRoutes = require('./routes/auth')
const tripRoutes = require('./routes/trips')

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected! ✅'))
  .catch((err) => console.log('MongoDB Error:', err))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/trips', tripRoutes)

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'AI Travel Planner Backend is running! 🚀' })
})

// Start server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})