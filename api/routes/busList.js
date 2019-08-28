const express = require('express');
const busListRouter = express.Router();
const checkAuth = require('../middleware/check_auth');
const busListController = require('../controllers/busListController');




busListRouter.get('/getAll',busListController.busListGetAll);


busListRouter.get('/getById/:_id',busListController.busListGetByObjectId);


busListRouter.post('/addOne',busListController.busListAddOne);

busListRouter.post('/updateOne',busListController.busListUpdateOne);

busListRouter.delete('/deleteOne/:_id',busListController.busListDeleteOne);

module.exports = busListRouter;