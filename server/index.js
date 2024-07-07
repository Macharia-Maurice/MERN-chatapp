const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const errorHandler = require('./middleware/errorHandler')

require('dotenv').config()
const app = express()

// middlewares
app.use(express.json())
app.use(cors())

// routes

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {console.log('Connected to MongoDB')})
  .catch((error) => {console.error('Error connecting to MongoDB:', error);});


// global error handler
app.use(errorHandler);


// server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

