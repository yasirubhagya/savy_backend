const express = require('express');
const userRouter = express.Router();
const checkAuth = require('../middleware/check_auth');
const userController = require('../controllers/userController');



//......./api/users/getAll
userRouter.get('/getAll',userController.userListGetAll);

//......./api/users/getById
userRouter.get('/getById/:_id',userController.userListGetByObjectId);

//......./api/users/addOne
userRouter.post('/addOne',userController.userListAddOne);

//......./api/users/updateOne
userRouter.post('/updateOne',userController.userListUpdateOne);

//......./api/users/deleteOne
userRouter.delete('/deleteOne/:_id',userController.userListDeleteOne);

module.exports = userRouter;