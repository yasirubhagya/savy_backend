const routeList = require('../models/routeModel');

exports.routeListGetAll = (req, res, next) => {
    routeList.find()
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => {
            res.status(500).json({ msg: error });
        });

}

exports.routeListGetByObjectId = (req, res, next) => {
    routeList.findById(req.params._id)
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => {
            res.status(500).json({ msg: error });
        });

}

exports.routeListAddOne = (req, res, next) => {
    let route = new routeList({
        routeCode:req.body.routeCode,
        routeName:req.body.routeName,
        startPoint: {
           name: req.body.startPoint.name,
           latitude: req.body.startPoint.latitude,
           longitude:req.body.startPoint.longitude
        },
        endPoint: {
           name: req.body.endPoint.name,
           latitude: req.body.endPoint.latitude,
           longitude: req.body.endPoint.longitude
        },
        points: [... req.body.points]
    }
);
    route.save()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => {
            res.status(500).json({ msg: error });
        })
}

exports.routeListUpdateOne = (req, res, next) => {
    let route = {
        routeCode:req.body.routeCode,
        routeName:req.body.routeName,
        startPoint: {
           name: req.body.startPoint.name,
           latitude: req.body.startPoint.latitude,
           longitude:req.body.startPoint.longitude
        },
        endPoint: {
           name: req.body.endPoint.name,
           latitude: req.body.endPoint.latitude,
           longitude: req.body.endPoint.longitude
        },
        points: [... req.body.points]
    };
    routeList.updateOne({_id:req.body._id},route).exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => {
            res.status(500).json({ msg: error });
        })
}

exports.routeListDeleteOne = (req, res, next) => {

    routeList.deleteOne({ _id: req.params._id }).exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => {
            res.status(500).json({ msg: error });
        })
}

