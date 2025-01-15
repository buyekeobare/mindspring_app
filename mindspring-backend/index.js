const express = require('express');
const dotenv = require('dotenv');
const analyticsRoutes = require('./routes/analytics');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Analytics routes
app.use('/api/analytics', analyticsRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
