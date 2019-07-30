const express = require('express');
const gpsRouter = express.Router();
const checkAuth = require('../middleware/check_auth');
const gpsController = require('../controllers/gpsController');




gpsRouter.get('/getAll',gpsController.gps_get_all);


gpsRouter.get('/getById/:Id',gpsController.gps_get_byTrackerId);

gpsRouter.get('/getById/:Id/live',gpsController.gps_get_live_byTrackerId);

gpsRouter.get('/add/:trackerId/:date/:latitude/:longitude',gpsController.gps_add);

module.exports = gpsRouter;