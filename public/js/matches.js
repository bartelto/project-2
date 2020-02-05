/* eslint-disable indent */
/* eslint-disable prettier/prettier */

console.log("loaded matches.js");

// grab the user profile template
let $profileTemplate = $("#matches-template");

//This is the user's Firebase connection variable(empty until login)
let currentFBUser;

//updateMatches();

$(document).on("click",".match-display-section", showModal);

function showModal(event) {

  $selectedProfile = $(event.target).closest(".match-display-section");
  $("#modal-name").text($selectedProfile.find(".match-name").text());
  $("#modal-email").text($selectedProfile.attr("data-email"))
    .attr("href", `mailto:${$selectedProfile.attr("data-email")}`);
  $("#modal-image").attr("src",$selectedProfile.find(".match-image").attr("src"));
  $("#modal-games-list").empty();
  $.get(`api/gameprefs/${$selectedProfile.attr("data-user-id")}`, function(data) {
    data.forEach( function(game) {
      let newGame = $("<li>");
      let gameLink = $("<a target='_blank'></a>").attr("href",`https://www.boardgameatlas.com/search/game/${game.gameId}`).text(game.gameName);
      newGame.append(gameLink);
      $("#modal-games-list").append(newGame);
    });
  });

  $('#match-modal').modal("show");

}

function updateMatches() {
  // use AJAX to send a request for match data
  $.get(`api/matches/${currentFBUser.email}`, function(data) {

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
        newMatch.attr("data-email",match.authId);
        newMatch.find(".match-image").attr("src",match.imageUrl);
        newMatch.find(".match-count").text(match.numMatches);
      });
    }
  });
}

// Firebase authentication
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    console.log(user.email + " is logged in.");
    currentFBUser = user;
    updateMatches();
  } else {
    // User is signed out.
    console.log("No user logged in.");
    window.location.href = "/"; // back to login screen
  }
});
