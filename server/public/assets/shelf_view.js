const server = 'http://localhost:3000/';
document.addEventListener("DOMContentLoaded", () => {
    
var button_book_del_shelf= document.querySelectorAll(".button_book_del_frm_shelf");
let shelf_id = document.querySelector("#shelf_id"); //for sendind requests to server
let user_id = document.querySelector("#user_id"); //for sendind requests to server


button_book_del_shelf.forEach(function (any) {

   
    any.addEventListener("click", function (e) {

        
        e.preventDefault();

        let book_isbn_10 = this.id;
        
        console.log(book_isbn_10);
        console.log(shelf_id.innerHTML);
        console.log(user_id.innerHTML);

        //  window.location = `${server}user/${parseInt(user_id.innerHTML)}/shelf/${parseInt(shelf_id)}`;
        
        var xhr = new XMLHttpRequest();
        xhr.open('DELETE', `${server}api/user/${parseInt(user_id.innerHTML)}/delete_book/${parseInt(shelf_id.innerHTML)}/${book_isbn_10}`, true);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onload = function () {
            if (this.status == 200) {
                window.location = `${server}user/${parseInt(user_id.innerHTML)}/shelf/${parseInt(shelf_id.innerHTML)}`;
        // //         //         var obj_del_shelf = JSON.parse(this.responseText);
        // //         //         //         console.log(obj_shelf);
        // //         //         
        // //         //         //         // if(login_status(users.status))
        // //         //         //         // {
        // //         //         //         //     console.log(users);
        // //         //         //         // }
        // //         //         //         // else 
        // //         //         //         // {
        // //         //         //         //     console.log(users);
        // //         //         //         //    let x = document.querySelector("#login_check");

        // //         //         //         //     x.innerHTML = "Incorrect username or password";
        // //         //         //         // }
              }
          }

        // // //          var data = JSON.stringify({ "shelf_name": shelf_name.value });
        
         xhr.send();
       

    }
    );
}
);

//Logout btn event listener
let logout_btn = document.querySelector("#logout_btn");

logout_btn.addEventListener("click",function(e)
{
    e.preventDefault();

    var xhr = new XMLHttpRequest();

    xhr.open('GET', `${server}user/${parseInt(user_id.innerHTML)}/logout`, true);

    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = function () {
        if (this.status == 200) {


            window.location = `${server}`;
        }
    }
    // console.log(new_bio.value);


    xhr.send();


});

let profile_btn = document.querySelector("#profile_btn");

profile_btn.addEventListener("click",function(e)
{
    e.preventDefault();
    console.log(user_id.innerHTML);
    var xhr = new XMLHttpRequest();

    xhr.open('GET', `${server}user/${parseInt(user_id.innerHTML)}`, true);

    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = function () {
        if (this.status == 200) {


             window.location = `${server}user/${user_id.innerHTML}`;
        }
    }
    // console.log(new_bio.value);


    xhr.send();


});





});