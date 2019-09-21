$(document).ready(function () {

    // Test
    console.log("page loaded");
});

//----------------------------------------------
// FUNCTIONS
//----------------------------------------------

var searchForGameImage = function (game) {

    // API Info
    var client_id = "9fjVgdS5UU";

    var client_secret = "0325e7b09e520fb8ac09629f3729f338";

    // Constructing a URL to search Board Game Atlas API for images of a game
    var queryURL = "https://www.boardgameatlas.com/api/search?name=" + game + "&client_id=" + client_id + "&limit=8";

    // Test
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

            // for (var i = 0; i < results.length; i++) {

            // console.log(results[i]);

            // Variables for specific API results
            var apiImage = results[0].images.small;
            //  console.log(apiImage);

            var apiName = results[0].name;
            var apiNum = results[0].id;

            // Test
            console.log(apiName);
            console.log(apiImage);
            console.log(apiNum);

            // Function to render image to page when profile is created
            var renderSearchedImage = function () {

                // Creating a div for the board game images
                var gameImageDiv = $('<div class="divForGameImage">');

                // Adding a submit type attribute to gameImageDiv
                gameImageDiv.attr("type", "submit");
                gameImageDiv.attr("id", apiNum);

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

                // Prepend the gameImageDiv to the "#searched-images-appear-here" div in the HTML
                $("#game-search-results-section").prepend(gameImageDiv);
                //  };

            };
            // Call renderSearchedImage function
            renderSearchedImage();

            // Event handler to select preferred images
            $(".divForGameImage").on("click", function (event) {
                console.log("IMAGE clicked!");

                // Preventing the button from trying to submit the form
                event.preventDefault();

                //
                //var preferrerdGame = $(this).attr("id");

                // Appending the content of the div with class .divForGameImage to the "#preferred-images-appear-here" div in the HTML
                $(".divForGameImage").appendTo("#preferred-images-appear-here");

                // Adding the class .selectedGame to the .divForGameImage
                $(".divForGameImage").addClass("selectedGame");
            });

        });

};

//----------------------------------------------
// EVENT HANDLERS
//----------------------------------------------

// Event handler for search button
$("#game-search-button").on("click", function (event) {

    console.log("SEARCH BUTTON clicked!");

    // Preventing the button from trying to submit the form
    event.preventDefault();

    // Storing the name of game
    var inputGame = $("#game-search-input").val().trim();

    // Running the searchForGameImage function, passing thru inputGame
    searchForGameImage(inputGame);

});

// Event handler to add preferred images to profile
$("#add-to-list-button").on("click", function (event) {
    console.log("ADD BUTTON clicked!");

    // Preventing the button from trying to submit the form
    event.preventDefault();

    // Appending the content of the div with class .selectedGame to the "#saved-images-appear-here" div in the HTML
    $(".selectedGame").prependTo("#saved-images-appear-here");

    // Adding the class .savedGame to the ".selectedGame" div
    $(".selectedGame").addClass("savedGame");

});

// Event handler for save-profile-button
$("#save-profile-button").on("click", function (event) {
    console.log("SAVE PROFILE BUTTON clicked!");

    // Preventing the button from trying to submit the form
    event.preventDefault();
});
