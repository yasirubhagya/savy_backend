const trackerList = require('../models/trackerListModel');

exports.trackerListGetAll = (req, res, next) => {
    trackerList.find()
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => {
            res.status(500).json({ msg: error });
        });

}

exports.trackerListGetByObjectId = (req, res, next) => {
    trackerList.findById(req.params._id)
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => {
            res.status(500).json({ msg: error });
        });

}

exports.trackerListAddOne = (req, res, next) => {
    let tracker = new trackerList({
        trackerId: req.body.trackerId,
        ownerId: req.body.ownerId,
    });
    tracker.save()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => {
            res.status(500).json({ msg: error });
        })
}

exports.trackerListDeleteOne = (req, res, next) => {

    trackerList.deleteOne({ _id: req.params._id }).exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => {
            res.status(500).json({ msg: error });
        })
}
