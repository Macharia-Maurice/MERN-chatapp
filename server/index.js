require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const errorHandler = require('./middleware/errorHandler');
const authRouter = require('./routes/authRoutes');

const app = express();

// Allow requests from frontend origin
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true, // Required to allow cookies with credentials
};

// middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// routes
app.use('/auth', authRouter);


// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => { console.log('Connected to MongoDB') })
  .catch((error) => { console.error('Error connecting to MongoDB:', error); });


// global error handler
app.use(errorHandler);


// server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

