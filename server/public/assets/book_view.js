const server = 'http://localhost:3000/';

document.addEventListener("DOMContentLoaded", () => {

    var my_rating_value;  //when i rate the book myself logged in
    var star_rating_op = document.querySelector(".book_avg_rat_star");
    var star_rat_res = document.querySelector("#Rating_integer_FROM_BACKEND_with_ejs");
    var rat_result_avg_text = document.querySelector(".textFor_book_avg_rating_number_result");
    var button_submit_my_review = document.querySelector("#button_submit_my_review");
    var user_id = document.querySelector("#user_id");
    var person_rating = document.querySelector(".person_rating");
    console.log(star_rating_op);
    console.log(star_rat_res.innerHTML);


    // CODE FOR STAR RATING ANIMATION START
    const container = document.querySelector('.rating');
    if (container) {
        const items = container.querySelectorAll('.rating-item');
        container.onclick = e => {
            const elClass = e.target.classList;
            // change the rating if the user clicks on a different star
            if (!elClass.contains('active')) {
                items.forEach( // reset the active class on the star
                    item => item.classList.remove('active')
                );

                my_rating_value = parseInt(e.target.getAttribute("data-rate"));

                console.log(my_rating_value);
                elClass.add('active'); // add active class to the clicked star
            }
        }
    }
    //CODE FOR STAR RATING ANIMATION END


    //if-else conditions for displaying and changing average 
    //rating according to the value of the || star_rat_res.innerHTML ||,
    // which is itslef querySelected from the html/ejs file

    if (parseInt(star_rat_res.innerHTML) === 1) {
        star_rating_op.innerHTML = "★ ☆ ☆ ☆ ☆";
        //rat_result_avg_text.appendChild(document.createTextNode(" 1"));
    }
    else if (parseInt(star_rat_res.innerHTML) === 2) {
        star_rating_op.innerHTML = "★ ★ ☆ ☆ ☆";
        //rat_result_avg_text.appendChild(document.createTextNode(" 2"));
    }
    else if (parseInt(star_rat_res.innerHTML) === 3) {
        star_rating_op.innerHTML = "★ ★ ★ ☆ ☆";
        //rat_result_avg_text.appendChild(document.createTextNode(" 3"));
    }
    else if (parseInt(star_rat_res.innerHTML) === 4) {
        star_rating_op.innerHTML = "★ ★ ★ ★ ☆";
        //rat_result_avg_text.appendChild(document.createTextNode(" 4"));
    }
    else if (parseInt(star_rat_res.innerHTML) === 5) {
        star_rating_op.innerHTML = "★ ★ ★ ★ ★";
        //rat_result_avg_text.appendChild(document.createTextNode(" 5"));
    }
    else if (parseInt(star_rat_res.innerHTML) === 0) {
        star_rating_op.innerHTML = "☆ ☆ ☆ ☆ ☆";
        rat_result_avg_text.innerHTML = "Not rated by anyone";
    }
    //if-else END

    let comments = document.querySelectorAll(".comment-div");
    comments.forEach((elem) => {
        let rating_val = elem.querySelector('.rating-val');
        let rating_img = elem.querySelector('.person_rating');

        if (parseInt(rating_val.innerHTML) === 1) {
            rating_img.innerHTML = "★ ☆ ☆ ☆ ☆";
            //rat_result_avg_text.appendChild(document.createTextNode(" 1"));
        }
        else if (parseInt(rating_val.innerHTML) === 2) {
            rating_img.innerHTML = "★ ★ ☆ ☆ ☆";
            //rat_result_avg_text.appendChild(document.createTextNode(" 2"));
        }
        else if (parseInt(rating_val.innerHTML) === 3) {
            rating_img.innerHTML = "★ ★ ★ ☆ ☆";
            //rat_result_avg_text.appendChild(document.createTextNode(" 3"));
        }
        else if (parseInt(rating_val.innerHTML) === 4) {
            rating_img.innerHTML = "★ ★ ★ ★ ☆";
            //rat_result_avg_text.appendChild(document.createTextNode(" 4"));
        }
        else if (parseInt(rating_val.innerHTML) === 5) {
            rating_img.innerHTML = "★ ★ ★ ★ ★";
            //rat_result_avg_text.appendChild(document.createTextNode(" 5"));
        }

    });




    if (container) {

        button_submit_my_review.addEventListener("click", function (e) {
            e.preventDefault();
            //popup_bio.style.display = "none";

            let my_rev_text = document.querySelector("#my_book_review_text"); // we could do my_rev_text.inner_html
            let book_id = document.querySelector("#book_id");
            // let user_id = document.querySelector('#user_id');

            var xhr = new XMLHttpRequest();
            xhr.open('POST', `${server}user/${parseInt(user_id.innerHTML)}/post_review/${book_id.innerHTML}`, true);
            xhr.setRequestHeader("Content-Type", "application/json");

            xhr.onload = function () {
              if (this.status == 200) {
                var obj_shelf = JSON.parse(this.responseText);
                console.log(obj_shelf);

                window.location = `${server}user/${parseInt(user_id.innerHTML)}/get_book/${book_id}`;
            }
             }
            console.log(my_rev_text.value);
            var data = JSON.stringify({ "review_content": my_rev_text.value, rating : my_rating_value });

            xhr.send(data);


        }); //check if any sytax error

    }
});

