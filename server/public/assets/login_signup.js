const server = 'http://localhost:3000/';

function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form_message--success", "form_message--error");
    messageElement.classList.add(`form__message--${type}`);
}

function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}

function login_status(status) 
{
   return status === "valid" ? true : false ; 
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");

    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });

    loginForm.addEventListener("submit", e => {
         e.preventDefault();

        let pass = document.querySelector('#login_pass');
        let email = document.querySelector('#login_email');

        var xhr = new  XMLHttpRequest();
        xhr.open('POST', `${server}api/user/signin`, true);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onload = function() {
            if(this.status == 200)
            {
                var users= JSON.parse(this.responseText);
                console.log(users);
                console.log(users.confirmed);
                if(login_status(users.status))
                {   
                    if(users.confirmed)
                    {
                    window.location = `${server}user/${users.user_id}`
                    }
                    else{
                        alert("Confirm your email First");
                        return;
                    }
                }
                else 
                {
                    console.log(users);
                   let x = document.querySelector("#login_check");

                    x.innerHTML = "Incorrect username or password";
                }
            } 
        }

        var data = JSON.stringify({ "user_pass": pass.value, "user_email": email.value }); 

        xhr.send(data);

    });

    createAccountForm.addEventListener("submit", e =>{
        e.preventDefault();
        
        let username = document.querySelector('#signup_username');
        let email = document.querySelector('#signup_email');
        let pass = document.querySelector('#signup_pass');
        let pass_confirm = document.querySelector("#signup_pass_confirm");

        if(pass.value !== pass_confirm.value){
            alert("Please enter correct confirmation password.");
            pass.value = "";
            pass_confirm.value = "";
            return;
        }

        if(username.value.trim().length===0)
        {
            alert("Enter A valid User name of atleast one character");
            return;
        }

        if(email.value.trim().length===0)
        {
            alert("Enter valid email");
            return;
        }


        if(pass.value.trim().length<4)
        {
            alert("Enter A valid password of atleast 8 characters");
            return;
        }

        

        var xhr = new  XMLHttpRequest();
        xhr.open('POST', `${server}api/user/signup`, true);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onload = function() {
            if(this.status == 200)
            {
                var user= JSON.parse(this.responseText);
                console.log(user);
                if(user.status!== "success")
                {
                    alert(user.status);
                    email.value = "";
                    return;
                }
                else{
                    window.location = `${server}`;
                }
            } 
        }

        var data = JSON.stringify({ "user_pass": pass.value, "user_email": email.value, "user_name": username.value}); 

        xhr.send(data);
    });

    /* document.querySelectorAll(".form__input").forEach(inputElement => {
         inputElement.addEventListener("blur", e => {
             if (e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length < 10) {
                 setInputError(inputElement, "Username must be at least 10 characters in length");
             }
         });
 
         inputElement.addEventListener("input", e => {
             clearInputError(inputElement);
         });
     }); */
});