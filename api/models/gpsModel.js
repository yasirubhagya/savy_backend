

const mongoose =require('mongoose');
const gpsSchema = mongoose.Schema({
    trackerId:{
        type:String,
        required:true
    },
    uDate:{
        type:Date,
        required:true
    },
    aDate:{
        type:Date,
        required:true
    },
    uTime:{
        type:Number,
        required:true
        
    },
    latitude:{
        type:Number,
        required:true
    },
    longitude:{
        type:Number,
        required:true
    },
    speed:{
         type:Number,
        required:true
    },
    battery:{
        type:Boolean,
        required:true
    }

});


module.exports = mongoose.model('gps',gpsSchema);