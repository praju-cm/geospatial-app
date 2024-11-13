const Shape = require('../models/shape');

// Save shapes data
exports.saveShapes = async (req, res) => {
  try {
    const { data } = req.body;

    // Clear existing shapes (optional, depending on your use case)
    await Shape.deleteMany({});

    // Save new shapes
    const shapes = await Shape.create(data);

    res.status(201).json({ message: 'Shapes saved successfully', shapes });
  } catch (error) {
    console.error('Error saving shapes:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Load shapes data
exports.loadShapes = async (req, res) => {
  try {
    const shapes = await Shape.find({});
    res.status(200).json(shapes);
  } catch (error) {
    console.error('Error loading shapes:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
