const express = require('express');
const router = express.Router();

const gpsRoutes = require('./api/routes/gps');
router.use('/trackers',gpsRoutes);
module.exports = router;