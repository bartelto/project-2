/* eslint-disable indent */
/* eslint-disable prettier/prettier */

console.log("inside matches.js");

// grab the user profile template
let $matchesSection = $("#matches-display-section");
let $profileTemplate = $("matches-template");

updateMatches();


function updateMatches() {


  // use AJAX to send a request for match data
  $.get("api/matches/1", function(data) {
    console.log(data);

    // clone the template and add it to the page
    $profileTemplate.clone().appendTo("#matches-display-section"); 

    
  });


}
