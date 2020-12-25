var btn_add_shelf = document.querySelector(".btn-add-shelf");
var pop_up= document.querySelector("#popup_for_adding");
var close_popup = document.querySelectorAll(".close_popup");

btn_add_shelf.addEventListener("click", function()
{
    pop_up.style.display = "block";
}
)

console.log(close_popup);

close_popup.forEach(function(any){

    
    any.addEventListener("click",function() {
        pop_up.style.display = "none";
    })
}
);
