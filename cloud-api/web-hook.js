'use strict';

const Datastore = require('@google-cloud/datastore');

// Instantiates a client
const datastore = Datastore();

module.exports = {
    process_intent: function(req, res) {

        /*"queryResult": {
            "queryText": "get all devices",
            "action": "get_all_devices",
            "parameters": {},

        "queryResult": {
            "queryText": "get the status of device 1",
            "action": "get_device_status",
            "parameters": {
              "Device": "device",
              "number": 1
            }

        "queryResult": {
        "queryText": "turn device 2 off",
        "action": "set_device_status",
        "parameters": {
        "Device": "device",
        "number": 2,
        "Status": "OFF"
        },

        */
        //var intent_set = this.extract_intent(req.body);

        var queryResult = req.body.queryResult;
        var intent = queryResult.action;

        var fulfillmentText = intent;

        var device_id = 'device00';

        switch (intent) {
            case 'get_all_devices':

                this.get_all_devices(res);

                break;
            case 'get_device_status':

                device_id = device_id + queryResult.parameters.number;

                this.get_device_status(res, device_id);

                break;

            case 'set_device_status':

                device_id = device_id + queryResult.parameters.number;
                var device_status = queryResult.parameters.Status;

                this.set_device_status(res, device_id, device_status);

                break;

            default:
                fulfillmentText = "Sorry ! I did't get you ! ";
                var resp = { "fulfillmentText": fulfillmentText };
                res.type('application/json'); // => 'application/json'
                res.status(200).send(JSON.stringify(resp));
                return resp;
        }
    },


    extract_intent: function(request) {

        var intent_set = { 'intent': 'unknown' };

        if (request.queryResult.action)

            return intent_set;

    },

    get_all_devices: function(res) {

        var kind = 'Device';
        const query = datastore.createQuery(kind).order('name');

        datastore.runQuery(query)
            .then(([entity]) => {
                // The get operation will not fail for a non-existent entity, it just
                // returns an empty dictionary.
                if (!entity) {
                    throw new Error(`No devices found.`);
                }

                var fft = "The ";

                var chk = entity.length;

                for (var item of entity) {
                    fft = fft + " Device " + item.name + " is " + item.status;
                    chk--;

                    if (chk > 0) {
                        fft = fft + " & ";
                    }
                }

                var resp = { "fulfillmentText": fft };

                res.type('application/json'); // => 'application/json'
                res.status(200).send(JSON.stringify(resp));
                return resp;

            })
            .catch((err) => {
                console.error(err);
                res.status(500).send(err.message);
                return Promise.reject(err);
            });

    },

    get_device_status: function(res, device_id) {

        const kind = "Device";

        const key = datastore.key([kind, device_id]);

        var fft = "The Device ";

        return datastore.get(key)
            .then(([entity]) => {
                // The get operation will not fail for a non-existent entity, it just
                // returns an empty dictionary.
                if (!entity) {
                    throw new Error(`No entity found for key ${key.path.join('/')}.`);
                }

                fft = fft + entity.name + " is " + entity.status;

                var resp = { "fulfillmentText": fft };

                res.type('application/json'); // => 'application/json'
                res.status(200).send(JSON.stringify(resp));
                return resp;

            })
            .catch((err) => {
                console.error(err);
                res.status(500).send(err.message);
                return Promise.reject(err);
            });

    },


    set_device_status: function(res, device_id, device_status) {

        const kind = "Device";

        const key = datastore.key([kind, device_id]);

        var fft = "The Device ";

        return datastore.get(key)
            .then(([entity]) => {
                // The get operation will not fail for a non-existent entity, it just
                // returns an empty dictionary.
                if (!entity) {
                    throw new Error(`No entity found for key ${key.path.join('/')}.`);
                }

                /* '{"category":"SWITCH","port":"8","status_code":"LOW","status":"On","name":"Switch
  001"}' */

                if (device_status == "ON") {
                    entity.status = 'On';
                    entity.status_code = 'LOW';
                }

                if (device_status == "OFF") {
                    entity.status = 'Off';
                    entity.status_code = 'HIGH';
                }

                const deviceSet = {
                    key: key,
                    data: entity
                };


                return datastore.save(deviceSet)
                    .then(() => {

                            fft = fft + entity.name + " is turned " + entity.status;

                            var resp = { "fulfillmentText": fft };

                            res.type('application/json'); // => 'application/json'
                            res.status(200).send(JSON.stringify(resp));
                            return resp;

                        }


                    )
                    .catch((err) => {
                        console.error(err);
                        res.status(500).send(err.message);
                        return Promise.reject(err);
                    });




            })
            .catch((err) => {
                console.error(err);
                res.status(500).send(err.message);
                return Promise.reject(err);
            });

    }







};