function init() {
  var user = sessionStorage.getItem("userId");
  var pwd = sessionStorage.getItem("pwd");
  var score = sessionStorage.getItem("score");
  var signup = document.getElementById("signup");
  var login = document.getElementById("login");
  var logout = document.getElementById("logout");
  var welcome = document.getElementById("welcome");
  var play = document.getElementById("play");
  var db = document.getElementById("db");
  var myaccount = document.getElementById("myaccount");
  var Accountwelcome = document.getElementById("Accountwelcome");
  var lastscore = document.getElementById("lastscore");
  var sharebutton = document.getElementById("sharebutton");
  if(user==null || pwd==null||user=="null" || pwd=="null"){
    play.style.display='none';
    db.style.display='none';
    myaccount.style.display='none';
    logout.style.display='none';
    welcome.style.display='none';
    signup.style.display='block';
    login.style.display='block';
  }
  else{
    play.style.display='block';
    db.style.display='block';
    myaccount.style.display='block';
    logout.style.display='block';
    welcome.style.display='block';
    signup.style.display='none';
    login.style.display='none';
    welcome.innerText = "Welcome " + user+"!";
    if(Accountwelcome !=null && Accountwelcome !="null"){
      Accountwelcome.innerText =  "Welcome " + user+"!";
      if(score!=null && score!="null"){
        lastscore.innerText =  "Your last score is "+score+", would you like to share?";
        sharebutton.style.display = 'block';
      }
    }
  }
}
//logout---------------------------------------------
function logout() {
  sessionStorage.setItem("userId",null);
  sessionStorage.setItem("pwd",null);
  sessionStorage.setItem("score",null);
  location.href="/";
}
//login---------------------------------------------
function login() {
  var name = document.getElementById("name").value;
  var pwd = document.getElementById("pwd").value;
  $.ajax({
    url: "http://localhost:8082/process_login",
    type: "post",
    data: {
      userName: name,
      pwd: pwd
    },
    success: function(res) {
      console.log(res.message);
      if (res.code == 0) {
        sessionStorage.setItem("userId",res.id);
        sessionStorage.setItem("pwd",res.password);
        alert("Welcome "+res.id+"!");
        init();
      } else {
        alert(res.message);
      }
    }
  });
}
//sign_up---------------------------------------------
function signup() {
  var Sname = document.getElementById("Sname").value;
  var Spwd = document.getElementById("Spwd").value;
  $.ajax({
    url: "http://localhost:8082/process_register",
    type: "post",
    data: {
      SuserName: Sname,
      Spwd: Spwd
    },
    success: function(res) {
      console.log(res);
      if (res.code == 0) {
        sessionStorage.setItem("userId",Sname);
        sessionStorage.setItem("pwd",Spwd);
        location.reload();
      } else {
        alert(res.message);
      }
    }
  });
}
//Share---------------------------------------------
function share() {
  var myDate = new Date();
  var yourscore =  sessionStorage.getItem("score");
  document.getElementById("sharedate").value =  myDate;
  document.getElementById("sharescore").value = yourscore;
}
//Message---------------------------------------------
function insertMessage() {
  var uploadName = sessionStorage.getItem("userId");
  var uploadScore = sessionStorage.getItem("score");
  var uploadTitle = document.getElementById("sharetitle").value;
  var uploadMessage = document.getElementById("sharemessage").value;
  var uploadDate = document.getElementById("sharedate").value;
  $.ajax({
    url: "http://localhost:8082/insertMessage",
    type: "post",
    data: {
      uploadName:uploadName,
      uploadScore:uploadScore,
      uploadTitle:uploadTitle,
      uploadMessage:uploadMessage,
      uploadDate:uploadDate
    },
    success: function(res) {
      console.log(res);
      if (res.code == 0) {
        alert(res.message);
      } else {
        alert(res.message);
      }
    }
  });
}
function getUserMessage(skip){
  var uname = sessionStorage.getItem("userId");
  var skip = skip;
    $.ajax({
      url: "http://localhost:8082/getUserMessage",
      type: "post",
      data: {
        uname:uname,
        skip:skip
      },
      success: function(res) {
        console.log(res);
        if (res.code == 0) {
          var j = res.mes;
          document.getElementById("title"+j).innerText = res.title;
          document.getElementById("score"+j).innerText = res.score;
          document.getElementById("date"+j).innerText = res.date;
          document.getElementById("modaltitle"+j).innerText = res.title;
          document.getElementById("modalmessage"+j).innerText = res.message;
          document.getElementById("modallike"+j).innerText = res.like;
        } else {
          alert(res.message);
        }
      }
    });
}
function showprofile() {
  getNum();
  var count = sessionStorage.getItem("count");
  if(count>3){count=3;}
  if(count!=null){
    for(var i=0;i<count ;i++){
      getUserMessage(i);
    }
  }
}

function getNum() {
  var uname = sessionStorage.getItem("userId");
  $.ajax({
    url: "http://localhost:8082/getNum",
    type: "post",
    data: {
      uname:uname,
    },
    success: function(res) {
      console.log(res);
      if (res.code == 0) {
        sessionStorage.setItem("count",res.count);
      } else {
        alert(res.message);
      }
    }
  });
}
//discussion_board-----------------------------------------------------------------
function getboxNum() {
  $.ajax({
    url: "http://localhost:8082/getboxNum",
    type: "post",
    data: {
    },
    success: function(res) {
      console.log(res);
      if (res.code == 0) {
        sessionStorage.setItem("boxNum",res.boxNum);
      } else {
        alert(res.message);
      }
    }
  });
}
function discuss(skip){
  var skip = skip;
  $.ajax({
    url: "http://localhost:8082/getDiscuss",
    type: "post",
    data: {
      skip:skip
    },
    success: function(res) {
      console.log(res);
      if (res.code == 0) {
        var j = res.mes;
        var start = sessionStorage.getItem("start");
        start = parseInt(start);
        j = j - start;
        document.getElementById("boxtitle"+j).innerText = res.title;
        document.getElementById("boxscore"+j).innerText = res.score;
        document.getElementById("boxlike"+j).innerText = res.like;
        document.getElementById("boxmessage"+j).innerText = res.message;
        document.getElementById("boxid"+j).innerText = res.date;
      } else {
        alert(res.message);
      }
    }
  });
}
function showdiscuss() {
  getboxNum();
  var boxNum = sessionStorage.getItem("boxNum");
  var start = sessionStorage.getItem("start");
  if(start==null){sessionStorage.setItem("start","0");start=0;}
  var maxNum = parseInt(boxNum);
  var i= parseInt(start);
  if(maxNum-i>6){maxNum=i+6;}
    for(i;i<maxNum ;i++){
      discuss(i);
    }
}
//switch_page-----------------------------------------------------------------
function next() {
  getboxNum();
  var boxNum = sessionStorage.getItem("boxNum");
  var start = sessionStorage.getItem("start");
  if(start==null){sessionStorage.setItem("start","0");start=0;}
  start = parseInt(start);
  boxNum = parseInt(boxNum);
  if ((start+6)<boxNum){
    start = start + 6;
    sessionStorage.setItem("start",start);
    location.reload();
  }
}
function previous() {
  var start = sessionStorage.getItem("start");
  if(start==null){sessionStorage.setItem("start","0");start=0;}
  start = parseInt(start);
  if (start>=6){start = start - 6;
    sessionStorage.setItem("start",start);
    location.reload();
  }
}
//like-----------------------------------------------------------------
function addlike(id,like) {
  if(like!=null){
    like = parseInt(like);
    like = like + 1;
    like = like.toString();
    $.ajax({
      url: "http://localhost:8082/addlike",
      type: "post",
      data: {
        id:id,
        like:like
      },
      success: function(res) {
        console.log(res);
        if (res.code == 0) {
          location.reload();
        } else {
          alert(res.message);
        }
      }
    });
    location.reload();
  }
  else {

  }
}
function like0() {
  var id = document.getElementById("boxid0").innerText;
  var like = document.getElementById("boxlike0").innerText;
  addlike(id,like);
}
function like1() {
  var id = document.getElementById("boxid1").innerText;
  var like = document.getElementById("boxlike1").innerText;
  addlike(id,like);
}
function like2() {
  var id = document.getElementById("boxid2").innerText;
  var like = document.getElementById("boxlike2").innerText;
  addlike(id,like);
}
function like3() {
  var id = document.getElementById("boxid3").innerText;
  var like = document.getElementById("boxlike3").innerText;
  addlike(id,like);
}
function like4() {
  var id = document.getElementById("boxid4").innerText;
  var like = document.getElementById("boxlike4").innerText;
  addlike(id,like);
}
function like5() {
  var id = document.getElementById("boxid5").innerText;
  var like = document.getElementById("boxlike5").innerText;
  addlike(id,like);
}
//progress_bar-----------------------------------------------------------------
function gethighest() {
  $.ajax({
    url: "http://localhost:8082/gethighest",
    type: "post",
    data: {
    },
    success: function(res) {
      console.log(res);
      if (res.code == 0) {
        sessionStorage.setItem("highestscore",res.score);
        document.getElementById("highestscore").innerText = "The highest score is "+res.score;
      } else {
        alert(res.message);
      }
    }
  });
}