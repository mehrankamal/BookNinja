document.addEventListener("DOMContentLoaded", ()=>{
var rat;

// CODE FOR STAR RATING
const container = document.querySelector('.rating');
const items = container.querySelectorAll('.rating-item')
container.onclick = e => {
const elClass = e.target.classList;
// change the rating if the user clicks on a different star
if (!elClass.contains('active')) {
items.forEach( // reset the active class on the star
item => item.classList.remove('active')
);

rating_value=parseInt(e.target.getAttribute("data-rate"));

console.log(rating_value);
elClass.add('active'); // add active class to the clicked star
}
}

//CODE FOR STAR RATING END

});

