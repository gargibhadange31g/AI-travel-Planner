const express = require('express')
const router = express.Router()
const Trip = require('../models/Trip')
const jwt = require('jsonwebtoken')

// Middleware to verify token
const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ message: 'No token!' })
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.userId = decoded.userId
    next()
  } catch {
    res.status(401).json({ message: 'Invalid token!' })
  }
}

// Save a trip
router.post('/save', auth, async (req, res) => {
  try {
    const { destination, days, budget, tripType, itinerary } = req.body
    const trip = new Trip({ userId: req.userId, destination, days, budget, tripType, itinerary })
    await trip.save()
    res.status(201).json({ message: 'Trip saved! ✅', trip })
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong!' })
  }
})

// Get all trips for a user
router.get('/mytrips', auth, async (req, res) => {
  try {
    const trips = await Trip.find({ userId: req.userId }).sort({ createdAt: -1 })
    res.json(trips)
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong!' })
  }
})

// Delete a trip
router.delete('/:id', auth, async (req, res) => {
  try {
    await Trip.findByIdAndDelete(req.params.id)
    res.json({ message: 'Trip deleted! ✅' })
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong!' })
  }
})

module.exports = router