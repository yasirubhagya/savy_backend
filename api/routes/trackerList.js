const express = require('express');
const trackerListRouter = express.Router();
const checkAuth = require('../middleware/check_auth');
const trackerListController = require('../controllers/trackerListController');



//......./api/users/getAll
trackerListRouter.get('/getAll',trackerListController.trackerListGetAll);

//......./api/users/getById
trackerListRouter.get('/getById/:_id',trackerListController.trackerListGetByObjectId);

//......./api/users/addOne
trackerListRouter.post('/addOne',trackerListController.trackerListAddOne);

//......./api/users/deleteOne
trackerListRouter.delete('/deleteOne/:_id',trackerListController.trackerListDeleteOne);

module.exports = trackerListRouter;