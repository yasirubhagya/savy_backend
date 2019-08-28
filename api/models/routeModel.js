
const mongoose = require('mongoose');
const routeListSchema = mongoose.Schema({
    routeCode: {
        type: String,
        required: true
    },
    routeName: {
        type:String,
        required: true
    },
    startPoint: {
        name: { type: String, require: true },
        latitude: { type: Number },
        longitude: { type: Number }
    },
    endPoint: {
        name: { type: String, require: true },
        latitude: { type: Number },
        longitude: { type: Number }
    },
    points: [
        {
            latitude: { type: Number },
            longitude: { type: Number }
        }
    ]

});

module.exports = mongoose.model('routeList', routeListSchema);