const corsOptions = {
    origin: process.env.FRONTEND_URL,
    credentials: true, // Required to allow cookies with credentials
  };

module.exports = corsOptions;