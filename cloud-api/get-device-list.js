exports.getDeviceList = (req, res) => {

    resp = {
        "status": 1,
        "data": {
            "devices": [{
                    "id": "1",
                    "title": "Switch 001",
                    "name": "switch001",
                    "port": "8",
                    "category": "SWITCH",
                    "device_stat": "2",
                    "status": "On",
                    "status_code": "LOW"
                },
                {
                    "id": "2",
                    "title": "Switch 002",
                    "name": "switch002",
                    "port": "9",
                    "category": "SWITCH",
                    "device_stat": "2",
                    "status": "On",
                    "status_code": "LOW"
                }
            ]
        }
    };

    //console.log(req.body.message);

    res.type('application/json'); // => 'application/json'
    res.status(200).send(JSON.stringify(resp));

};