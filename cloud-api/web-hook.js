
var http = require('http');

http.createServer(function(req, res) {

    var resp = { "fulfillmentText": "This is a text response" };

    //console.log(req.body.message);

    res.type('application/json'); // => 'application/json'
    res.status(200).send(JSON.stringify(resp));

}).listen(8080);