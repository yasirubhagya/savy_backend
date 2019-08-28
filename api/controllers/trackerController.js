const gpsImuModel = require('../models/gpsModel');
const trackerList = require('../models/trackerListModel');
const turf = require('@turf/turf');
const mongoose = require('mongoose');

exports.trackerGetLiveData = (req,res,next)=>{
     trackerList.findOne({trackerId:req.params.trackerId}).exec()
     .then(result=>{
         if(result!=undefined){
            //result.trackerId+"GpsImuData"
         /*  return new gpsImuModel({
            trackerId:"Tr0",
            dateTime:new Date(),
            latitude:5.2,
            longitude:6.2,
            imu: [
                {
                    accelx: 2.5,
                    accely: 5.6,
                    accelz: 3.2,
                    gyrox: 5.3,
                    gyroy: 2.3,
                    gyroz: 56.2
                }
            ]
           }).save()
            */
          return gpsImuModel.find({trackerId:req.params.trackerId}).sort({dateTime:-1}).limit(1).exec();
         }else{
             throw "requested trackerId not found";
         }
     })
     .then(result=>{
        res.status(200).json(result);
     })
     .catch(error=>{
        res.status(500).json({msg : error});
     })
}

exports.trackerGetDataRange = (req,res,next)=>{
    trackerList.findOne({trackerId:req.params.trackerId}).exec()
    .then(result=>{
        if(result!=undefined){
           
         return gpsImuModel.find({trackerId:req.params.trackerId,dateTime:{ $gte: new Date(req.params.from), $lte: new Date(req.params.to) }}).sort({dateTime:-1}).exec();
        }else{
            throw "requested trackerId not found";
        }
    })
    .then(result=>{
       res.status(200).json(result);
    })
    .catch(error=>{
       res.status(500).json({msg : error});
    })
}

