const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // Import the CORS package
const analyticsRoutes = require('./routes/analytics');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Use CORS middleware to allow cross-origin requests from the frontend
app.use(cors()); // This will allow all domains by default

// Middleware to parse JSON requests
app.use(express.json());

// Analytics routes
app.use('/api/analytics', analyticsRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
