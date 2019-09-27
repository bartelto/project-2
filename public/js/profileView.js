/* eslint-disable indent */
/* eslint-disable prettier/prettier */

console.log("loaded profileView.js");

// grab the game preference template?
//let $profileTemplate = $("#matches-template");

$displayedName = $("#user-name");
$displayedProfilePic = $("#profile-pic");

displayProfile();

function displayProfile() {
  // use AJAX to send a request for current user data
  $.get("api/users/albert@gmail.com", function(data) {
    $displayedName.text(data.screenName);
    $displayedProfilePic.attr("src", data.imageUrl);
  });


}
