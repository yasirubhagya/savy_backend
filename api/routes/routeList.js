const express = require('express');
const routeListRouter = express.Router();
const checkAuth = require('../middleware/check_auth');
const routeListController = require('../controllers/routeListController');




routeListRouter.get('/getAll',routeListController.routeListGetAll);


routeListRouter.get('/getById/:_id',routeListController.routeListGetByObjectId);


routeListRouter.post('/addOne',routeListController.routeListAddOne);

routeListRouter.post('/updateOne',routeListController.routeListUpdateOne);

routeListRouter.delete('/deleteOne/:_id',routeListController.routeListDeleteOne);

module.exports = routeListRouter;