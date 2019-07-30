const gps = require('../models/gpsModel');
const routeStat = require('../models/route_statModel');
const route = require('../models/routeModel');
const driver = require('../models/driverModel');
const turf = require('@turf/turf');



exports.gps_get_all = (req, res, next) => {
    gps.find((err, result) => {
        if (err) {
            res.status(500).json({msg : err});
        }
        else {
            res.status(200).json(result);
        }
    }).sort({ "aDate": -1 }).limit(500);
}


exports.gps_get_byTrackerId = (req, res, next) => {

    gps.find({ trackerId: req.params.trackerId }, { latitude: 1, longitude: 1, _id: 0 }, (err, result) => {
        if (err) {
            res.status(500).json({msg : err});
        } else {
            res.status(200).json(result);
        }

    }).sort({ "uDate": -1 }).limit(500);

}

exports.gps_get_live_byTrackerId = (req, res, next) => {

    gps.find({ trackerId: req.params.trackerId }, { latitude: 1, longitude: 1, _id: 0 }, (err, result) => {
        if (err) {
            res.status(500).json({msg : err});
        } else {
            res.status(200).json(result);
        }
    }).sort({ "uDate": -1 }).limit(1);

}

exports.gps_get_byTrackerId_launchTime =(req, res, next) => {

    gps.find({ trackerId: req.params.trackerId, uDate: { $gt: req.params.launchDateTime } }, { latitude: 1, longitude: 1, _id: 0 }, (err, result) => {
        if (err) {
            res.status(500).json({msg : err});
        } else {
            res.status(200).json(result);
        }
    }).sort({ "uDate": -1 });

}

exports.gps_get_byTrackerId_from_to = (req, res, next) => {
    gps.find({ trackerId: req.params.trackerId, uDate: { $gt: req.params.launchDateTime, $lt: req.params.endDateTime } }, { latitude: 1, longitude: 1, _id: 0 }, (err, gps) => {
        res.status(200).json(gps);
    }).sort({ uDate: -1 });
}

exports.gps_add = (req, res, next) => {
    let newGps = new gps({
        trackerId: req.params.trackerId,
        uDate: new Date(req.params.uDate),
        aDate: new Date(),
        uTime: new Date(req.params.uDate).getTime(),
        latitude: req.params.latitude,
        longitude: req.params.longitude,
        speed: req.params.speed,
        battery: req.params.battery,
    });
    let gpsdata;
    let routestat;
    let routedata;
    let driverdata;
    let gpsSaved = false;
    newGps.save()
        .then(result => {
            gpsSaved = true;
            gpsdata = result;
            return routeStat.findOne({ trackerId: result.trackerId, $or: [{ status: 1 }, { status: 0 }] }).exec();
        })
        .then(result => {
            routestat = result;
            return route.findOne({ routeId: result.routeId }).exec();
        })
        .then(result => {
            routedata = result;
            return driver.findOne({ empId: routestat.empId }).exec();
        })
        .then(result => {
            driverdata = result;
            return new Promise((resolve, reject) => {
                if (result) {

                    resolve(result);
                } else {
                    reject('Error-No driver');
                }
            });
        })
        .then((result) => {
            let lat;
            let lon;
            let i = routedata.cordinates.length - 1;
            routestat.first_name = driverdata.first_name;
            routestat.cordinates[0] = routedata.cordinates[0]
            routestat.cordinates[1] = routedata.cordinates[i]
            if (routestat.status == 0) {
                lat = routedata.cordinates[0].latitude;
                lon = routedata.cordinates[0].longitude;
            } else {

                lat = routedata.cordinates[i].latitude;
                lon = routedata.cordinates[i].longitude;
            }
            const from = turf.point([gpsdata.latitude,gpsdata.longitude]);
            const to =turf.point([lat,lon]);
            const dist = turf.distance(from,to,{units:'kilometers'});
            console.log(dist);
            if (dist < 0.4) {
                if (routestat.status == 0) {
                    routestat.startTime = new Date();
                    routestat.status = 1;
                }
                else {
                    routestat.endTime = new Date();
                    routestat.status = 2;
                }
            }
            routestat.elapsedTime=routestat.endTime - routestat.startTime;
            return routeStat.findByIdAndUpdate(routestat._id, routestat);
        }).then(result=>{
            res.status(200).json({ msg: 'Success' });
        })
        .catch(err => {
            if(gpsSaved){
                res.status(500).json({ msg: 'failed after saving gps data' });
            }else{
                res.status(500).json({ msg: 'failed' });
            }
        });

}