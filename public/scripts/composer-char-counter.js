$(document).ready(function() {
  // --- our code goes here ---
  $(".new-tweet form textarea").on("keyup", function() {
    let counter = $(this).parents("form").find("div .counter");
    let charLeft = 140 - $(this).val().length;
    counter.val(charLeft);
    if(charLeft < 0) {
      counter.css("color", "red");
    }
  })

});