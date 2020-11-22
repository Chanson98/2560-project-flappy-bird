var mongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/';

function searchUser(whereStr, callBack) {
    mongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db('node_runoob');
        dbo.collection('site').find(whereStr).toArray(function (err, result) {
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
        var dbo = db.db('node_runoob');
        dbo.collection('site').insertOne(myobj, function (err, res) {
            if (err) throw err;
            console.log('insert data success');
            callBack(res);
            db.close();
        })
    })
}

exports.searchUser = searchUser;
exports.insertUser = insertUser;