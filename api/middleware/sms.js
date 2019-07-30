const https = require('https');
const residence = require('../models/residenceModel');


exports.sms_send = (msg, routeId, next) => {
    residence.find({ 'routeId': routeId })
        .exec()
        .then(result => {
            result.forEach((resi, index) => {
                
                const options = {
                    hostname: 'app.notify.lk',
                    port: 443,
                    path: encodeURI(`/api/v1/send?user_id=10610&api_key=R7nGiH97mRDAG9gsHvvm&sender_id=NotifyDEMO&to=${resi.mobileno}&message=${msg}`),
                    method: 'GET'
                };

                const req = https.request(options, (res) => {
                    res.on('data', (d) => {
                        process.stdout.write(d);
                    });
                });

                req.on('error', (e) => {
                    console.error(e);
                });
                req.end();
            });
        })
        .catch(err => {

        });
}