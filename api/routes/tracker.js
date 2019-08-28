const express = require('express');
const trackerRouter = express.Router();

const checkAuth = require('../middleware/check_auth');
const trackerController = require('../controllers/trackerController');

trackerRouter.get('/getLiveData/:trackerId',trackerController.trackerGetLiveData);

trackerRouter.get('/getData/:trackerId/:from/:to',trackerController.trackerGetDataRange);



module.exports = trackerRouter;