const gpsImuSchema = require('../schemas/gpsImuSchema');
const trackerList = require('../models/trackerListModel');
const turf = require('@turf/turf');
const mongoose = require('mongoose');

exports.trackerGetLiveData = (req,res,next)=>{
     trackerList.findOne({trackerId:req.params.trackerId}).exec()
     .then(result=>{
         if(result!=undefined){
            let tracker =  mongoose.model(result.trackerId,gpsImuSchema);
          return tracker.find().sort({dateTime:-1}).limit(1).exec();
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
           let tracker =  mongoose.model(result.trackerId,gpsImuSchema);
         return tracker.find({dateTime:{ $gte: new Date(req.params.from), $lte: new Date(req.params.to) }}).sort({dateTime:-1}).exec();
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

