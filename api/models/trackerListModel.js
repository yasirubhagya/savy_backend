
const mongoose = require('mongoose');
const trackerListSchema = mongoose.Schema({
    trackerId: {
        type: String,
        required: true
    },
    ownerId:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true
    }
});


module.exports = mongoose.model('trackerList', trackerListSchema);