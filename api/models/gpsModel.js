

const mongoose =require('mongoose');
const gpsSchema = mongoose.Schema({
    trackerId:{
        type:String,
        required:true
    },
    dateTime:{
        type:Date,
        required:true
    },
    latitude:{
        type:Number,
        required:true
    },
    longitude:{
        type:Number,
        required:true
    }
});


module.exports = mongoose.model('gps',gpsSchema);