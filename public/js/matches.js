/* eslint-disable indent */
/* eslint-disable prettier/prettier */

console.log("loaded matches.js");

// grab the user profile template
let $profileTemplate = $("#matches-template");

updateMatches();

function updateMatches() {
  // use AJAX to send a request for match data
  $.get("api/matches/2", function(data) {

    if (data.length === 0) {
      $("#matches-display-section").append("<h3>Sorry, you have no matches!<h3>");
    } else {
      // copy the template's contents and add them to a new <div>
      data.forEach( function(match) {
        let newMatch = $("<div>").attr("data-id",match.id).html($profileTemplate.html()).appendTo("#matches-display-section");
        newMatch.find(".match-name").text(match.screenName); 
        newMatch.find(".match-image").attr("src",match.imageUrl);
      });
    }
  });


}