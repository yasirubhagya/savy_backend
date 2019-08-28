
const http = require('http');
const app = require('./app');
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const axios = require('axios');

server.listen(port, () => {
    console.log("Listening on port :", port);
});

/* setInterval(() => {
    let client_Id = "Tr01";
    let a = {
        [`savyMqtt/trackers/${client_Id}/data`]: { qos: 1 },
        [`savyMqtt/trackers/${client_Id}/usd/result`]: { qos: 1 },
        [`savyMqtt/trackers/${client_Id}/siminfo/result`]: { qos: 1 },
    }

    console.log(a);
}, 500) */