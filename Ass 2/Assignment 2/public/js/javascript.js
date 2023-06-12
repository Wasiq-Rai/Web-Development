function LoginScreen(){
    var username = document.getElementById("username")
    var password = document.getElementById("password")
    
    if(username.value === "" ){
        username.classList.add("error")
        username.classList.remove("input")
    }
    else{
        username.classList.remove("error")
        username.classList.add("input")
    }
    if(password.value === "" ){

        password.classList.add("error")
        password.classList.remove("input")
    }
    else{
        password.classList.remove("error")

        password.classList.add("input")
    }
    if(password.value!="" && username.value != "")
    {
        var success = document.getElementById("success")
            success.style.display = "block";
        
    }
}

// function review_transform(){
const mainCard = document.getElementById('main-card');
const leftCard = document.getElementById('left-card');
const rightCard = document.getElementById('right-card');

leftCard.onclick = function() {
    leftCard.style.zIndex = '2';
    mainCard.style.zIndex = '1';
    rightCard.style.zIndex = '1';
  };

  rightCard.onclick = function() {
    leftCard.style.zIndex = '1';
    mainCard.style.zIndex = '1';
    rightCard.style.zIndex = '2';
  };
  mainCard.onclick = function() {
    leftCard.style.zIndex = '1';
    mainCard.style.zIndex = '2';
    rightCard.style.zIndex = '1';
  };


// }