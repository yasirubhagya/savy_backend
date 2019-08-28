const express = require('express');
const router = express.Router();
const gpsRoutes = require('./api/routes/gps');
const userRoutes = require('./api/routes/user');
const trackerListRoutes = require('./api/routes/trackerList');
router.use('/tracker',gpsRoutes);
router.use('/users',userRoutes);
router.use('/trackerList',trackerListRoutes);
module.exports = router;