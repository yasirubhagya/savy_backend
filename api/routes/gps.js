const express = require('express');
const gpsRouter = express.Router();
const checkAuth = require('../middleware/check_auth');
const gpsController = require('../controllers/gpsController');




gpsRouter.get('/getAll',gpsController.gps_get_all);


gpsRouter.get('/getById',gpsController.gps_get_byTrackerId);

gpsRouter.get('/getById/live',gpsController.gps_get_live_byTrackerId);

gpsRouter.get('/gps.json/:trackerId/:uDate/:latitude/:longitude/:speed/:battery',gpsController.gps_add);

module.exports = gpsRouter;