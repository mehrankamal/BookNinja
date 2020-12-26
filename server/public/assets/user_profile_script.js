const server = 'http://localhost:3000/';




document.addEventListener("DOMContentLoaded", () => {
    var btn_add_shelf = document.querySelector(".btn-add-shelf");
    var pop_up = document.querySelector("#popup_for_adding");
    var close_popup = document.querySelectorAll(".close_popup");
    var submit_shelf = document.querySelector("#submit_shelf");
    var delete_shelf = document.querySelectorAll(".delete_shelf");
    var go_to_shelf = document.querySelectorAll(".btn_go_to_shelf");
    var pop_up_go_to_shelf = document.querySelector("#pop_up_for_go_to_shelf");
    var close_popup_goToShelf = document.querySelectorAll(".close_popup_goToShelf")

    //go_to_shelf_pop_up_logic


    go_to_shelf.forEach(function (any) {


        any.addEventListener("click", function (e) {
            
            pop_up_go_to_shelf.style.display = "block";
            //new code i entered
            var shelf_name_in_popup = document.querySelector("#shelf_name_for_pop_up_go_to_shelf");
                shelf_name_in_popup.innerHTML=this.id;



            console.log(this.id);
           
            e.preventDefault();

            let user_id = document.querySelector('#user_id');
            let shelf_id = this.id;

            // var xhr = new XMLHttpRequest();
            // // xhr.open('POST', `${server}api/user/${parseInt(user_id.innerHTML)}/add_shelf`, true);
            // xhr.setRequestHeader("Content-Type", "application/json");

            // xhr.onload = function () {
            //     if (this.status == 200) {
            //         var obj_del_shelf = JSON.parse(this.responseText);
            //         //         console.log(obj_shelf);
            //         window.location = `${server}user/${parseInt(user_id.innerHTML)}`;
            //         //         // if(login_status(users.status))
            //         //         // {
            //         //         //     console.log(users);
            //         //         // }
            //         //         // else 
            //         //         // {
            //         //         //     console.log(users);
            //         //         //    let x = document.querySelector("#login_check");

            //         //         //     x.innerHTML = "Incorrect username or password";
            //         //         // }
            //              }
            //          }

            //          var data = JSON.stringify({ "shelf_name": shelf_name.value });

            //          xhr.send(data);

                }
        )
    }
    );

    //go_to_shelf_pop_up_logic_End

    btn_add_shelf.addEventListener("click", function () {
        pop_up.style.display = "block";
    }
    )

    delete_shelf.forEach(function (any) {


        any.addEventListener("click", function (e) {
            console.log(this.id);
            e.preventDefault();

            let user_id = document.querySelector('#user_id');
            let shelf_id = parseInt(this.id);

            var xhr = new XMLHttpRequest();
            console.log(`${server}api/user/${parseInt(user_id.innerHTML)}/delete_shelf/${shelf_id}`);
            xhr.open('DELETE', `${server}api/user/${parseInt(user_id.innerHTML)}/delete_shelf/${shelf_id}`, true);
            // xhr.setRequestHeader("Content-Type", "application/json");

            xhr.onload = function () {
                if (this.status == 200) {
                    console.log("Response recieved");
                    window.location = `${server}user/${user_id.innerHTML}`;
                    // var obj_del_shelf = JSON.parse(this.responseText);
                    // //         console.log(obj_shelf);
                    // window.location = `${server}user/${parseInt(user_id.innerHTML)}`;
                    //         // if(login_status(users.status))
                    //         // {
                    //         //     console.log(users);
                    //         // }
                    //         // else 
                    //         // {
                    //         //     console.log(users);
                    //         //    let x = document.querySelector("#login_check");

                    //         //     x.innerHTML = "Incorrect username or password";
                    //         // }
                         }
                 }

                    // var data = JSON.stringify({ "shelf_name": shelf_name.value });

                    xhr.send();

                
            
        }
        )
    }
    );


    // console.log(close_popup);

    close_popup.forEach(function (any) {


        any.addEventListener("click", function () {
            pop_up.style.display = "none";
        })
    }
    );

    close_popup_goToShelf.forEach(function (any) {


        any.addEventListener("click", function () {
            pop_up_go_to_shelf.style.display = "none";
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
