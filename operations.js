
//create
exports.insertDocument = (db, document, collection) => {
    const coll = db.collection(collection);
    return coll.insertOne(document);
};

//read
exports.findDocuments = (db, collection) => {
    const coll = db.collection(collection);
    return coll.find({}).toArray();
};

//delete
exports.removeDocument = (db, document, collection) => {
    const coll = db.collection(collection);
    return coll.deleteOne(document);
};

//update
exports.updateDocument = (db, document, update, collection) => {
    const coll = db.collection(collection);
    return coll.updateOne(document, { $set: update }, null);
};