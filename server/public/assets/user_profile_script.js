const server = 'http://localhost:3000/';




document.addEventListener("DOMContentLoaded", () => {
    var btn_add_shelf = document.querySelector(".btn-add-shelf");
    var pop_up = document.querySelector("#popup_for_adding");
    var close_popup = document.querySelectorAll(".close_popup");
    var submit_shelf = document.querySelector("#submit_shelf");

    btn_add_shelf.addEventListener("click", function () {
        pop_up.style.display = "block";
    }
    )


    console.log(close_popup);

    close_popup.forEach(function (any) {


        any.addEventListener("click", function () {
            pop_up.style.display = "none";
        })
    }
    );
    submit_shelf.addEventListener("click", e => {


        e.preventDefault();

        let user_id = document.querySelector('#user_id');
        let shelf_name = document.querySelector('#shelf_name');

        var xhr = new XMLHttpRequest();
        xhr.open('POST', `${server}api/user/${parseInt(user_id.innerHTML)}/add_shelf`, true);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onload = function () {
            if (this.status == 200) {
                var obj_shelf = JSON.parse(this.responseText);
                console.log(obj_shelf);
                window.location = `${server}user/${parseInt(user_id.innerHTML)}`;
                // if(login_status(users.status))
                // {
                //     console.log(users);
                // }
                // else 
                // {
                //     console.log(users);
                //    let x = document.querySelector("#login_check");

                //     x.innerHTML = "Incorrect username or password";
                // }
            }
        }

        var data = JSON.stringify({ "shelf_name": shelf_name.value });

        xhr.send(data);

    });

});
