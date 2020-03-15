//mongodb node driver and communicate with mongodb server through it from a node application
const MongoClient = require('mongodb').MongoClient; //mongodb nodejs driver imported from the mongoclient object
const assert = require('assert').strict;
const dboper = require('./operations');

const url = 'mongodb://localhost:27017/'; //mongodb server
const dbname = 'nucampsite';

//mongoclient connect method  connect to mangodb server
MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {

    assert.strictEqual(err, null);

    console.log('Connected correctly to server');

    const db = client.db(dbname); //this method will connect with nucampsite database on the mongodb server //db object interact with database

    //delete = remove = drop //dropped collection
    db.dropCollection('campsites', (err, result) => {
        assert.strictEqual(err, null);
        console.log('Dropped Collection', result);


        //insert document
        dboper.insertDocument(db, { name: "Breadcrumb Trail Campground", description: "Test" },
            'campsites', result => {
                console.log('Insert Document:', result.ops);

                dboper.findDocuments(db, 'campsites', docs => {
                    console.log('Found Documents:', docs);

                    dboper.updateDocument(db, { name: "Breadcrumb Trail Campground" },
                        { description: "Updated Test Description" }, 'campsites',
                        result => {
                            console.log('Updated Document Count:', result.result.nModified);

                            dboper.findDocuments(db, 'campsites', docs => {
                                console.log('Found  Documents:', docs);

                                dboper.removeDocument(db, { name: "Breadcrumb Trail Campground" },
                                    'campsites', result => {
                                        console.log('Deleted Document Count:', result.deletedCount);

                                        client.close(); // immediately close the client connection to the mangodb server
                                    });
                            });
                        }
                    );
                });
            });
    });
});