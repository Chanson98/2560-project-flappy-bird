var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db = require('./db');


app.use('/public', express.static('public'));

//application/x-www-form-urlencoded code 
var urlencodedParser = bodyParser.urlencoded({ extended: false });


app.get('/login.html', function (req, res) {
    res.sendFile(__dirname + '/' + 'login.html');
})


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/' + 'index.html');
})

//login api
app.post('/process_login', urlencodedParser, function (req, res) {
    var userName = req.body.userName;
    var pwd = req.body.pwd; 
    if (!userName) {
        res.json({ code: -1, message: 'user name can not be null' });
    } else if (!pwd) {
        res.json({ code: -1, message: 'password can not be null' });
    } else {
        db.searchUser({ name: userName }, function (result) {
            if (result.length > 0) {
                if (result[0].name == userName && result[0].pwd == pwd) {
                    res.json({ code: 0, message: 'login success' }); 
                } else {
                    res.json({ code: -1, message: 'wrong username or password ' });
                }
            } else {
                res.json({ code: -1, message: 'this account doesnot exist' });
            }
        });
    }
})

//main page
app.get('/main.html', function (req, res) {
    res.sendFile(__dirname + '/' + 'main.html');
})

app.get('/game.html', function (req, res) {
    res.sendFile(__dirname + '/' + 'game.html');
})
app.get('/discussion.html', function (req, res) {
    res.sendFile(__dirname + '/' + 'discussion.html');
})
//regester html
app.get('/register.html', function (req, res) {
    res.sendFile(__dirname + '/' + 'register.html');
})

//register api
app.post('/process_register', urlencodedParser, function (req, res) {
    var userName = req.body.userName;
    var pwd = req.body.pwd;
    if (!userName) {
        res.json({ code: -1, message: 'user name can not be null' });
    } else if (!pwd) {
        res.json({ code: -1, message: 'password can not be null' });
    } else {
        db.searchUser({ name: userName }, function (result) {
            if (result.length > 0 && result[0].name == userName) {
                res.json({ code: -1, message: 'the account has already exists, just login in' });
            } else {

                db.insertUser({ name: userName, pwd: pwd }, function (insertResult) {
                    console.log(insertResult)
                    if (insertResult.insertedCount > 0) {
                        res.json({ code: 0, message: 'sign up success' });
                    } else {
                        res.json({ code: -1, message: 'fail to sign in,please register again' });
                    }
                })
            }
        });
    }
})

var server = app.listen(8082, function () { 
    var port = server.address().port; 
    console.log('please visit http://localhost:8082');
})
