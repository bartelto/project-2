/* eslint-disable indent */
/* eslint-disable prettier/prettier */

console.log("loaded profileView.js");

// grab the game preference template?
//let $profileTemplate = $("#matches-template");

let $displayedName = $("#user-name");
let $displayedProfilePic = $("#profile-pic");
let $displayedGameList = $("#user-game-list");

displayProfile();

function displayProfile() {
  // use AJAX to send a request for current user data
  $.get("api/users/albert@gmail.com", function(data) {
    console.log(data);
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
  });


}
