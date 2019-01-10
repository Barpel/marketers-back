var dbConn = null;

function connectToMongo() {
    if (dbConn) return Promise.resolve(dbConn);
    const MongoClient = require('mongodb').MongoClient;

    const URL = 'mongodb://barpel:barpel1@ds151864.mlab.com:51864/selectom_db';

    return MongoClient.connect(URL)
        .then(client => {
            console.log('connected to MongoDB, woohoo!');

            client.on('close', () => {
                console.log('MongoDB Disconnected');
                dbConn = null;
            })
            dbConn = client.db();
            return dbConn;
        })
}

module.exports = { connect: connectToMongo }