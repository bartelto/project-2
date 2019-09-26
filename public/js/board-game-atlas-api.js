/* eslint-disable quotes */
/* eslint-disable indent */
/* eslint-disable prettier/prettier */
$(document).ready(function () {

    console.log("page loaded");
});

//----------------------------------------------
// FUNCTIONS
//----------------------------------------------

var searchForGameImage = function (game) {

    // API Info
    var clientId = "9fjVgdS5UU";

    //var clientSecret = "0325e7b09e520fb8ac09629f3729f338";

    // Constructing a URL to search Board Game Atlas API for images of a game
    var queryURL = "https://www.boardgameatlas.com/api/search?name=" + game + "&client_id=" + clientId + "&limit=8";

    //console.log(queryURL);

    // Performing our AJAX GET request
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // After the data comes back from the API, do the actions in this function
        .then(function (response) {

            // Storing an array of results in the results variable
            var results = response.games;

            for (var i = 0; i < results.length; i++) {

                // Variables for specific API results
                var apiImage = results[i].images.small;
                //  console.log(apiImage);

                var apiName = results[i].name;
                var apiNum = results[i].id;

                // Test
                console.log(apiName);
                console.log(apiImage);
                console.log(apiNum);

                // Function to render image to page when profile is created
                var renderSearchedImage = function () {

                    // Creating a div for the board game images
                    var gameImageDiv = $('<div class="divForGameImage">');

                    // Adding a submit type, id, and value attribute to gameImageDiv
                    gameImageDiv.attr("type", "submit");
                    gameImageDiv.attr("id", apiNum);
                    gameImageDiv.attr("value", "searched");
                    gameImageDiv.attr("data-id", apiNum)
                      .attr("data-name", apiName)
                      .attr("data-image", apiImage);

                    // Creating an image tag
                    var gameImage = $("<img>");

                    // Creating game name paragraph
                    var gameName = $("<p>").text(apiName);

                    // Giving the image tag an src attribute and a new id
                    gameImage.attr("src", apiImage);
                    gameImage.attr("id", "searchedGameImage");

                    // Giving the gameName a new id
                    gameName.attr("id", "searchedGameName");

                    // Append the gameImage & gameName we created to the created "gameImageDiv" div
                    gameImageDiv.append(gameImage);
                    gameImageDiv.append(gameName);

                    // Append the gameImageDiv to the "#searched-images-appear-here" div in the HTML
                    $("#game-search-results-section").append(gameImageDiv);

                };

                // Call renderSearchedImage function
                renderSearchedImage();
            }

            // Select games to add to list
            $(document).on("click", ".divForGameImage", function () {

                // Creating variable value to identify value of this .divForGameImage
                var value = $(this).attr("value");

                // Preventing the button from trying to submit the form
                event.preventDefault();

                // If the value of .divForGameImage is "searched", change it to "add-to-list"
                if (value === "searched") {
                    console.log("IMAGE clicked!");
                    $(this).attr("value", "add-to-list");
                    $(this).addClass("addedGame");
                }
                // Else, keep it as is
                else {
                    $(this).attr("value", "searched");
                }
            });
        });
};

//----------------------------------------------
// EVENT HANDLERS
//----------------------------------------------

// Event handler for game-search-button
$("#game-search-button").on("click", function (event) {

    console.log("SEARCH BUTTON clicked!");

    // Preventing the button from trying to submit the form
    event.preventDefault();

    // Storing the name of game
    var inputGame = $("#game-search-input").val().trim();

    // Running the searchForGameImage function, passing thru inputGame
    searchForGameImage(inputGame);

});

// Event handler to add preferred images to user-list-gallery-section
$("#add-to-list-button").on("click", function (event) {
    console.log("ADD TO LIST BUTTON clicked!");

    // Preventing the button from trying to submit the form
    event.preventDefault();

    // Appending .divForGameImage to user-list-gallery-section div
    $(".addedGame").appendTo("#user-list-gallery-section");
    $("#game-search-results-section").empty();

});

// Event handler for save-profile-button
$("#save-profile-button").on("click", function (event) {
    console.log("SAVE PROFILE BUTTON clicked!");

    // Preventing the button from trying to submit the form
    event.preventDefault();

    // Post User data via AJAX
    $.ajax("/api/users", {
      type: "POST",
      data: {
        authId: $("#user-email-input").val().trim(),
        screenName: $("#user-name-input").val().trim(),
        imageUrl: $("#user-imageURL-input").val().trim(),
      }
    }).then(
      function(data) {
        console.log("added new user, id = " + data.id);
        //let addedGames = $(".addedGame");
        let list = $(".addedGame").map(function(){
          let game = {
            gameId: $(this).attr("data-id"),
            gameName: $(this).attr("data-name"),
            UserId: data.id
          } 
          return game; 
        }).get();
        //console.log(list);
       
        // Post GamePref data via AJAX
        $.ajax("/api/gameprefs", {
          type: "POST",
          data: list[0]
        }).then(
          function() {
            console.log("added new GamePrefs");

          // load the profile view page
          });
      }
    );

    // Empty divs
    $("#game-search-results-section").empty();

});
