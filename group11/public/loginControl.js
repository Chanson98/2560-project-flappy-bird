sessionStorage.setItem("userId","aaa");
function init(){
  var user = sessionStorage.getItem("userId");
  if(user!="null"){
    alert("1111111");
    var signup = document.getElementById("signup");
    var login = document.getElementById("login");
    signup.style.display='none';
    login.style.display='none';
  }else{
    var play = document.getElementById("play");
    var db = document.getElementById("db");
    var myaccount = document.getElementById("myaccount");
    play.style.display='none';
    db.style.display='none';
    myaccount.style.display='none';
  }
}

function test() {
  var user = sessionStorage.getItem("userId");
  alert(user);
}