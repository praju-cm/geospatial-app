const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const fileRoutes = require('./routes/fileRoutes');
const shapeRoutes = require('./routes/shapeRoutes');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/geospatial', {
});

// Use the routes
app.use('/api/users', userRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/shapes', shapeRoutes);

// Define a route for the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the Geospatial Data Management API');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
