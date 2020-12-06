var mongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/mydb';

function searchUser(whereStr, callBack) {
    mongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db('mydb');
        dbo.collection('user').find(whereStr).toArray(function (err, result) {
            if (err) throw err;
            console.log('search for specific data...', result);
            callBack(result);
            db.close();
        })
    })
}

function insertUser(myobj, callBack) {
    mongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db('mydb');
        dbo.collection('user').insertOne(myobj, function (err, res) {
            if (err) throw err;
            console.log('insert data success');
            callBack(res);
            db.close();
        })
    })
}

function getUserMessage(nameStr,skip, callBack) {
    mongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var sk = parseInt(skip);
        var dbo = db.db('mydb');
        var mysort = { score: -1 };
        dbo.collection('messagebox').find(nameStr).sort(mysort).skip(sk).toArray(function (err, result) {
            if (err) throw err;
            console.log('search for specific data...', result);
            callBack(result);
            db.close();
        })
    })
}

function insertMessage(myobj, callBack) {
    mongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db('mydb');
        dbo.collection('messagebox').insertOne(myobj, function (err, res) {
            if (err) throw err;
            console.log('insert message success');
            callBack(res);
            db.close();
        })
    })
}

function getDiscuss(skip, callBack) {
    mongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var sk = parseInt(skip);
        var dbo = db.db('mydb');
        var mysort = { score: -1 };
        dbo.collection('messagebox').find().sort(mysort).skip(sk).toArray(function (err, result) {
            if (err) throw err;
            console.log('search for specific data...', result);
            callBack(result);
            db.close();
        })
    })
}
function addlike(id,like, callBack) {
    mongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db('mydb');
        dbo.collection("messagebox").updateOne(id, {$set:like}, function(err, res) {
            if (err) throw err;
            db.close();
        })
    })
}

exports.searchUser = searchUser;
exports.insertUser = insertUser;
exports.getUserMessage = getUserMessage;
exports.insertMessage = insertMessage;
exports.getDiscuss = getDiscuss;addlike
exports.addlike = addlike;

