/* eslint-disable indent */
/* eslint-disable prettier/prettier */

console.log("loaded profileView.js");

//This is the user's Firebase connection variable(empty until login)
let currentFBUser;

// grab the game preference template?
//let $profileTemplate = $("#matches-template");

let $displayedName = $("#user-name");
let $displayedProfilePic = $("#profile-pic");
let $displayedGameList = $("#user-game-list");

function displayProfile() {
  // use AJAX to send a request for current user data

  $.get(`api/users/${currentFBUser.email}`, function(data, err) {
    
    if (data) {
    
      $displayedName.text(data.screenName);
      $displayedProfilePic.attr("src", data.imageUrl);

      // display game preferences
      data.GamePrefs.forEach( function(game) {
        let newGame = $("<li>");
        let gameLink = $("<a target='_blank'></a>")
          .attr("href",`https://www.boardgameatlas.com/search/game/${game.gameId}`)
          .text(game.gameName);
        newGame.append(gameLink);
        $displayedGameList.append(newGame);
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
    displayProfile();
  } else {
    // User is signed out.
    console.log("No user logged in.");
    window.location.href = "/"; // back to login screen
  }
});