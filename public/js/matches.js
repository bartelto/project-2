/* eslint-disable indent */
/* eslint-disable prettier/prettier */

console.log("loaded matches.js");

// grab the user profile template
let $profileTemplate = $("#matches-template");


updateMatches();

$(document).click(".match-display-section", function(event) {
  $selectedProfile = $(event.target).closest(".match-display-section");
  $("#modal-name").text($selectedProfile.find(".match-name").text());
  $("#modal-image").attr("src",$selectedProfile.find(".match-image").attr("src"));
  $("#modal-games-list").empty();
  $.get(`api/gameprefs/${$selectedProfile.attr("data-user-id")}`, function(data) {
    data.forEach( function(game) {
      let newGame = $("<li>").text(game.gameName);
      $("#modal-games-list").append(newGame);
    });
  });

  $('#match-modal').modal("show");

})
/*
$('#match-modal').on('show.bs.modal', function (event) {
  console.log("modal showing");
});
*/
function updateMatches() {
  // use AJAX to send a request for match data
  $.get("api/matches/1", function(data) {

    if (data.length === 0) {
      $("#matches-display-section").append("<h3>Sorry, you have no matches!<h3>");
    } else {
      // copy the template's contents and add them to a new <div>
      data.forEach( function(match) {
        //console.log(match);
        let newMatch = $profileTemplate.children().clone().removeAttr("hidden").appendTo("#matches-display-section");
        //let newMatch = $("<div>").attr("data-id",match.id).html($profileTemplate.html()).appendTo("#matches-display-section");
        newMatch.attr("data-user-id",match.id);
        newMatch.find(".match-name").text(match.screenName); 
        newMatch.find(".match-image").attr("src",match.imageUrl);
      });
    }
  });



}
