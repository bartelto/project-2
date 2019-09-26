/* eslint-disable indent */
/* eslint-disable prettier/prettier */

console.log("loaded profileCreation.js");

// grab the user profile template
//let $profileTemplate = $("#matches-template");

$(".save-profile-button").on("submit", function(event) {
  // Make sure to preventDefault on a submit event.
  event.preventDefault();

  console.log("save button clicked");
  createUser();
});

function createUser() {
  // use AJAX to send a request for match data
  $.ajax("/api/user", {
    type: "POST",
    data: {
      screenName: $("user-name-input").val().trim(),
      imageUrl: $("user-imageURL-input").val().trim(),
    }
  }).then(
    function() {
      console.log("added new user");
      // load the profile view page
  
    }
  );

}
