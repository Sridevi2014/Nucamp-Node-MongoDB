const assert = require('assert').strict;

//create
exports.insertDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);
    //call back function
    coll.insertOne(document, (err, result) => {
        assert.strictEqual(err, null);
        callback(result);
    });
};

//read
exports.findDocuments = (db, collection, callback) => {
    const coll = db.collection(collection);
    coll.find().toArray((err, docs) => {
        assert.strictEqual(err, null);
        callback(docs);
    });
};

//delete
exports.removeDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);
    coll.deleteOne(document, (err, result) => {
        assert.strictEqual(err, null);
        callback(result);
    });
};
//update
exports.updateDocument = (db, document, update, collection, callback) => {
    const coll = db.collection(collection);
    coll.updateOne(document, { $set: update }, null, (err, result) => {
        assert.strictEqual(err, null);
        callback(result);
    });
};