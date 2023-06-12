console.log("Hello WORLD")

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



