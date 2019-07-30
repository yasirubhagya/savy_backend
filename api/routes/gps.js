const express = require('express');
const gpsRouter = express.Router();
const checkAuth = require('../middleware/check_auth');
const gpsController = require('../controllers/gpsController');




gpsRouter.get('/gps.json',checkAuth,gpsController.gps_get_all);


gpsRouter.get('/gps.json/trackerId/:trackerId',checkAuth,gpsController.gps_get_byTrackerId);

gpsRouter.get('/gps.json/trackerId/:trackerId/live',checkAuth,gpsController.gps_get_live_byTrackerId);


gpsRouter.get('/gps.json/trackerId/:trackerId/dateTime/:launchDateTime',checkAuth,gpsController.gps_get_byTrackerId_launchTime);

gpsRouter.get('/gps.json/trackerId/:trackerId/from/:launchDateTime/to/:endDateTime',checkAuth,gpsController.gps_get_byTrackerId_from_to);


gpsRouter.get('/gps.json/:trackerId/:uDate/:latitude/:longitude/:speed/:battery',gpsController.gps_add);

module.exports = gpsRouter;