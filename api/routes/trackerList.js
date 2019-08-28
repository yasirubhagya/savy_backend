const express = require('express');
const trackerListRouter = express.Router();
const checkAuth = require('../middleware/check_auth');
const trackerListController = require('../controllers/trackerListController');




trackerListRouter.get('/getAll',trackerListController.trackerListGetAll);


trackerListRouter.get('/getById/:_id',trackerListController.trackerListGetByObjectId);


trackerListRouter.post('/addOne',trackerListController.trackerListAddOne);

trackerListRouter.delete('/deleteOne/:_id',trackerListController.trackerListDeleteOne);

module.exports = trackerListRouter;