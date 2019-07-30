
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const mainRoutes =require('./mainroutes');


mongoose.connect('mongodb://greentrack:kFOyhL2VV2n23JxF@greentrack-shard-00-00-hkfzd.mongodb.net:27017,greentrack-shard-00-01-hkfzd.mongodb.net:27017,greentrack-shard-00-02-hkfzd.mongodb.net:27017/greentrack?ssl=true&replicaSet=greentrack-shard-0&authSource=admin&retryWrites=true',
    { useNewUrlParser: true }
);
mongoose.Promise=global.Promise;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers",
        "Origin,X-Requested-With,Content-Type,Accept,Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Methods", "POST,GET,DELETE,PUT")
        return res.status(200).json({});
    }
    next();
});

app.use('/api',mainRoutes);



app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;