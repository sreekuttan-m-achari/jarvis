'use strict';

const Datastore = require('@google-cloud/datastore');

// Instantiates a client
const datastore = Datastore();

const webhook =  require('./web-hook') ; 

function getKeyFromRequestData(requestData) {

    var kind = "Device" ;

    if (!requestData.key) {
        throw new Error('Key not provided. Make sure you have a "key" property in your request');
    }

    return datastore.key([kind, requestData.key]);

    /*if (!requestData.kind) {
        throw new Error('Kind not provided. Make sure you have a "kind" property in your request');
    }

    return datastore.key([requestData.kind, requestData.key]);
    */
}

/**
 * Creates and/or updates a record.
 *
 * @example
 * gcloud functions call set --data '{"kind":"Device","key":"sampleDevice1","value":{"description": "Buy milk"}}'
 *
 * @param {object} req Cloud Function request context.
 * @param {object} req.body The request body.
 * @param {string} req.body.kind The Datastore kind of the data to save, e.g. "Device".
 * @param {string} req.body.key Key at which to save the data, e.g. "sampleDevice1".
 * @param {object} req.body.value Value to save to Cloud Datastore, e.g. {"description":"Buy milk"}
 * @param {object} res Cloud Function response context.
 */
exports.set_device = (req, res) => {
    // The value contains a JSON document representing the entity we want to save
    if (!req.body.value) {
        throw new Error('Value not provided. Make sure you have a "value" property in your request');
    }

    const key = getKeyFromRequestData(req.body);
    const entity = {
        key: key,
        data: req.body.value
    };


    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin,Content-Type, Authorization, x-id, Content-Length, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    

    return datastore.save(entity)
        .then(() => res.status(200).send(`Entity ${key.path.join('/')} saved.`))
        .catch((err) => {
            console.error(err);
            res.status(500).send(err.message);
            return Promise.reject(err);
        });
};

/**
 * Retrieves a record.
 *
 * @example
 * gcloud functions call get --data '{"kind":"Device","key":"sampleDevice1"}'
 *
 * @param {object} req Cloud Function request context.
 * @param {object} req.body The request body.
 * @param {string} req.body.kind The Datastore kind of the data to retrieve, e.g. "Device".
 * @param {string} req.body.key Key at which to retrieve the data, e.g. "sampleDevice1".
 * @param {object} res Cloud Function response context.
 */
exports.get_device = (req, res) => {
    const key = getKeyFromRequestData(req.body);


    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin,Content-Type, Authorization, x-id, Content-Length, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    

    return datastore.get(key)
        .then(([entity]) => {
            // The get operation will not fail for a non-existent entity, it just
            // returns an empty dictionary.
            if (!entity) {
                throw new Error(`No entity found for key ${key.path.join('/')}.`);
            }

            res.status(200).send(entity);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send(err.message);
            return Promise.reject(err);
        });
};

/**
 * Deletes a record.
 *
 * @example
 * gcloud functions call del --data '{"kind":"Device","key":"sampleDevice1"}'
 *
 * @param {object} req Cloud Function request context.
 * @param {object} req.body The request body.
 * @param {string} req.body.kind The Datastore kind of the data to delete, e.g. "Device".
 * @param {string} req.body.key Key at which to delete data, e.g. "sampleDevice1".
 * @param {object} res Cloud Function response context.
 */
exports.del = (req, res) => {
    const key = getKeyFromRequestData(req.body);
    
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin,Content-Type, Authorization, x-id, Content-Length, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

    // Deletes the entity
    // The delete operation will not fail for a non-existent entity, it just
    // doesn't delete anything
    return datastore.delete(key)
        .then(() => res.status(200).send(`Entity ${key.path.join('/')} deleted.`))
        .catch((err) => {
            console.error(err);
            res.status(500).send(err);
            return Promise.reject(err.message);
        });
};

exports.web_hook = (req, res) => {

    //var resp = { "fulfillmentText": "Sorry ! The Device API is still under development.. Please check after sometime" };

    var resp = webhook.process_intend(req, res) ;

    console.log(req.body.message);

    res.type('application/json'); // => 'application/json'
    res.status(200).send(JSON.stringify(resp));

};

exports.get_device_list = (req, res) => {

    var kind = 'Device' ;

    const query = datastore.createQuery(kind).order('name');

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin,Content-Type, Authorization, x-id, Content-Length, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

    datastore.runQuery(query)
        .then(([entity]) => {
            // The get operation will not fail for a non-existent entity, it just
            // returns an empty dictionary.
            if (!entity) {
                throw new Error(`No devices found.`);
            }

            var resp = {
                        "status": 1,
                        "data": {
                            "devices": entity 
                        }
                    };
            
            res.type('application/json'); // => 'application/json'
            res.status(200).send(JSON.stringify(resp));

        })
        .catch((err) => {
            console.error(err);
            res.status(500).send(err.message);
            return Promise.reject(err);
        });  

};