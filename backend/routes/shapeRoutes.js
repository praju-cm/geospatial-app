const express = require('express');
const router = express.Router();
const ShapeController = require('../controllers/ShapeController');

router.post('/save', ShapeController.saveShapes);
router.get('/load', ShapeController.loadShapes);

module.exports = router;
