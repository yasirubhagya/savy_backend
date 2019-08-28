
const busList = require('../models/busModel');

exports.busListGetAll = (req, res, next) => {
    busList.find()
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => {
            res.status(500).json({ msg: error });
        });

}

exports.busListGetByObjectId = (req, res, next) => {
    busList.findById(req.params._id)
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => {
            res.status(500).json({ msg: error });
        });

}

exports.busListAddOne = (req, res, next) => {
    let bus = new busList({
        regNo:req.body.regNo,
        trackerId:req.body.trackerId,
        ownerId:req.body.ownerId,
        routeId:req.body.routeId
    });
    bus.save()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => {
            res.status(500).json({ msg: error });
        })
}

exports.busListUpdateOne = (req, res, next) => {
    let bus ={
        trackerId:req.body.trackerId,
        routeId:req.body.routeId
    };
    busList.updateOne({_id:req.body._id},bus).exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => {
            res.status(500).json({ msg: error });
        })
}

exports.busListDeleteOne = (req, res, next) => {

    busList.deleteOne({ _id: req.params._id }).exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => {
            res.status(500).json({ msg: error });
        })
}

