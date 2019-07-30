const gps = require('../models/gpsModel');
const turf = require('@turf/turf');



exports.gps_get_all = (req, res, next) => {
    gps.find().sort({ "date": -1 }).limit(500).exec()
    .then(result=>{
        res.status(200).json(result);
    })
    .catch(err=>{
        res.status(500).json({msg : err});
    })
}


exports.gps_get_byTrackerId = (req, res, next) => {

    gps.find({ trackerId: req.params.Id },{ latitude: 1, longitude: 1, _id: 0,date:1 }).sort({ "date": -1 }).limit(500).exec()
    .then(result=>{
        res.status(200).json(result);
    })
    .catch(err=>{
        res.status(500).json({msg : err});
    })


}

exports.gps_get_live_byTrackerId = (req, res, next) => {

    gps.find({ trackerId: req.params.Id }, { latitude: 1, longitude: 1, _id: 0,date:1 }).sort({ "date": -1 }).limit(1).exec()
    .then(result=>{
        res.status(200).json(result);
    })
    .catch(err=>{
        res.status(500).json({msg : err});
    })


}

exports.gps_add = (req, res, next) => {
    let newGps = new gps({
        trackerId: req.params.trackerId,
        date: new Date(req.params.date),
        latitude:  req.params.latitude,
        longitude: req.params.longitude,
    });
    newGps.save()
        .then(result => {
            res.status(200).json("ok");
        })
        .catch(err => {
                res.status(500).json({ msg: err });
        });

}