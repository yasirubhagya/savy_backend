
const mongoose = require('mongoose');
const busListSchema = mongoose.Schema({
    regNo:{
        type: String,
        required: true
    },
    trackerId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    ownerId:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true
    },
    routeId:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true
    }
});

module.exports = mongoose.model('busList',busListSchema);