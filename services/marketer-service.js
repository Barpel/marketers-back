'use strict';

const mongoService = require('./mongo-service');

const ObjectId = require('mongodb').ObjectId; //if needed by mongoId

module.exports = {
    query,
    getByEmail,
    addMarketer,
    getById,
    remove,
    update
}

function query() {
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('marketers');
            return collection.find().toArray();
        })
}

function getByEmail(marketerEmail) {
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('marketers');
            return collection.findOne({ email: marketerEmail });
        })
}

function getById(marketerId) {
    marketerId = new ObjectId(marketerId);
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('marketers');
            return collection.findOne({ _id: marketerId });
        });
}

function addMarketer(marketerData) {
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('marketers');
            return collection.insertOne(marketerData)
                .then(marketer => marketer.ops[0]);
        });
}

function remove(marketerId) {
    marketerId = new ObjectId(marketerId);
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('marketers');
            return collection.remove({ _id: marketerId });
        });
}

function update(marketerData) {
    marketerData._id = new ObjectId(marketerData._id);
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('marketers');
            return collection.updateOne({ _id: marketerData._id }, { $set: marketerData })
                .then(_ => {
                    return marketerData;
                })
        })
}