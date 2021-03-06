//Node Callback Hell and Promises
//mongodb node driver and communicate with mongodb server through it from a node application
const MongoClient = require('mongodb').MongoClient; //mongodb nodejs driver imported from the mongoclient object
const assert = require('assert').strict;
const dboper = require('./operations');

const url = 'mongodb://localhost:27017/'; //mongodb server
const dbname = 'nucampsite';

//mongoclient connect method  connect to mangodb server
MongoClient.connect(url, { useUnifiedTopology: true }).then(client => {


    console.log('Connected correctly to server');

    const db = client.db(dbname); //this method will connect with nucampsite database on the mongodb server //db object interact with database

    //delete = remove = drop //dropped collection
    db.dropCollection('campsites', (err, result) => {
        assert.strictEqual(err, null);
        console.log('Dropped Collection', result);


        dboper.insertDocument(db, { name: "Breadcrumb Trail Campground", description: "Test" },
            'campsites')
            .then(result => {
                console.log('Insert Document:\n', result.ops);

                return dboper.findDocuments(db, 'campsites');
            })
            .then(docs => {
                console.log('Found Documents:\n', docs);

                return dboper.updateDocument(db, { name: "Breadcrumb Trail Campground" },
                    { description: "Updated Test" }, 'campsites');

            })
            .then(result => {
                console.log('Updated Document:\n', result.result);

                return dboper.findDocuments(db, 'campsites');
            })
            .then(docs => {
                console.log('Found Updated Documents:\n', docs);

                return db.dropCollection('campsites');
            })
            .then(result => {
                console.log('Dropped Collection:', result);

                return client.close(); // immediately close the client connection to the mangodb server
            })
            .catch(err => console.log(err));
    });

})
    .catch(err => console.log(err));