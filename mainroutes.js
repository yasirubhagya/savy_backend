const express = require('express');
const router = express.Router();

const gpsRoutes = require('./api/routes/gps');
router.use('/gateways',gpsRoutes);
module.exports = router;