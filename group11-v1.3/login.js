var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db = require('./db');

app.use('/public', express.static('public'));

//application/x-www-form-urlencoded code 
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get('/login.html', function (req, res) {
    res.sendFile(__dirname + '/' + 'index.html');
})

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/' + 'index.html');
})
//register api----------------------------------------------------------------------------
app.post('/process_register', urlencodedParser, function (req, res) {
    var SuserName = req.body.SuserName;
    var Spwd = req.body.Spwd;
    if (!SuserName) {
        res.json({ code: -1, message: 'user name can not be null' });
    } else if (!Spwd) {
        res.json({ code: -1, message: 'password can not be null' });
    } else {
        db.searchUser({ name: SuserName }, function (result) {
            if (result.length > 0 && result[0].name == SuserName) {
                res.json({ code: -1, message: 'the account has already exists, just login in' });
            } else {
                db.insertUser({ name: SuserName, pwd: Spwd }, function (insertResult) {
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
//login api----------------------------------------------------------------------------
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
                    res.json({ code: 0, message: 'login success',id:result[0].name, password:result[0].pwd });
                } else {
                    res.json({ code: -1, message: 'wrong username or password ' });
                }
            } else {
                res.json({ code: -1, message: 'this account doesnot exist' });
            }
        });
    }
})
//My_account------------------------------------------------------------------------------------------
app.post('/insertMessage', urlencodedParser, function (req, res) {
    var uploadName = req.body.uploadName;
    var uploadScore = req.body.uploadScore;
    var uploadTitle = req.body.uploadTitle;
    var uploadMessage = req.body.uploadMessage;
    var uploadDate = req.body.uploadDate;
    var uploadLike = 0;
    db.insertMessage({ uname: uploadName, score: uploadScore,title:uploadTitle,message:uploadMessage,date:uploadDate,like:uploadLike }, function (insertResult) {
        if (insertResult.insertedCount > 0) {
            res.json({ code: 0, message: 'insert message success' });
        } else {
            res.json({ code: -1, message: 'fail, try again' });
        }
    });
})
app.post('/getUserMessage', urlencodedParser, function (req, res) {
    var uname = req.body.uname;
    var skip = req.body.skip;
    if (!uname) {
        res.json({ code: -1, message: 'error!' });
    } else {
        db.getUserMessage({ uname: uname },skip, function (userMessageResult) {
            if(userMessageResult[0]!=null){
                if (userMessageResult[0].uname==uname) {
                    res.json({ code: 0, title: userMessageResult[0].title, score:userMessageResult[0].score,
                        message:userMessageResult[0].message, date:userMessageResult[0].date, like:userMessageResult[0].like, mes:skip });
                } else {
                    res.json({ code: -1, message: 'ffffff' });
                }
            }
        });
    }
})

app.post('/getNum', urlencodedParser, function (req, res) {
    var uname = req.body.uname;
    var count = 0;
    if (!uname) {
        res.json({ code: -1, message: 'error!' });
    } else {
        db.getUserMessage({ uname: uname },0, function (userMessageResult) {
            if(userMessageResult[0]!=null){
                if (userMessageResult[0].uname==uname) {
                    count = userMessageResult.length;
                    res.json({ code: 0, count:count});
                } else {
                    res.json({ code: -1, message: 'ffffff' });
                }
            }
        });
    }
})
//Discussion_board------------------------------------------------------------------------------------------
app.post('/getboxNum', urlencodedParser, function (req, res) {
    var boxNum = 0;
    if (0) {
        res.json({ code: -1, message: 'error!' });
    } else {
        db.getDiscuss(0, function (userMessageResult) {
            if(userMessageResult[0]!=null){
                if (1) {
                    boxNum = userMessageResult.length;
                    res.json({ code: 0, boxNum:boxNum});
                } else {
                    res.json({ code: -1, message: 'ffffff' });
                }
            }
        });
    }
})
app.post('/getDiscuss', urlencodedParser, function (req, res) {
    var skip = req.body.skip;
    if (0) {
        res.json({ code: -1, message: 'error!' });
    } else {
        db.getDiscuss(skip, function (userMessageResult) {
            if(userMessageResult[0]!=null){
                if (1) {
                    res.json({ code: 0,id:userMessageResult[0]._id, title: userMessageResult[0].title, score:userMessageResult[0].score,
                        message:userMessageResult[0].message, date:userMessageResult[0].date, like:userMessageResult[0].like, mes:skip });
                } else {
                    res.json({ code: -1, message: 'ffffff' });
                }
            }
        });
    }
})
//like------------------------------------------------------------------------------------------
app.post('/addlike', urlencodedParser, function (req, res) {
    var id = req.body.id;
    var like = req.body.like;
    like = parseInt(like);
    db.addlike({'date':id},{'like':like}, function (userMessageResult) {
        if(1){res.json({ code: 0});}
    });
})
//progress_bar------------------------------------------------------------------------------------------
app.post('/gethighest', urlencodedParser, function (req, res) {
    db.getDiscuss(0,function (userMessageResult) {
        if(userMessageResult[0]!=null){res.json({ code: 0,score:userMessageResult[0].score});}
    });
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
    res.sendFile(__dirname + '/' + 'index.html');
})
app.get('/forget.html', function (req, res) {
    res.send("sign up to get a new one!");
})





var server = app.listen(8082, function () { 
    var port = server.address().port; 
    console.log('please visit http://localhost:8082');
})
