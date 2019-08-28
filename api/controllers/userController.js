const userList = require('../models/userModel');

exports.userListGetAll = (req, res, next) => {
    userList.find().select('firstName lastName email')
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => {
            res.status(500).json({ msg: error });
        });

}

exports.userListGetByObjectId = (req, res, next) => {
    userList.findById(req.params._id).select('firstName lastName email')
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => {
            res.status(500).json({ msg: error });
        });

}

exports.userListAddOne = (req, res, next) => {
    let user = new userList({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        passwordHash: req.body.password
    });
    user.save()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => {
            res.status(500).json({ msg: error });
        })
}

exports.userListUpdateOne = (req, res, next) => {
    let user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    };

    userList.updateOne({ _id: req.body._id }, user).exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => {
            res.status(500).json({ msg: error });
        })
}

exports.userListDeleteOne = (req, res, next) => {

    userList.deleteOne({ _id: req.params._id }).exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => {
            res.status(500).json({ msg: error });
        })
}
