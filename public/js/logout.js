/* eslint-disable no-unused-vars */
/* eslint-disable indent */
/* eslint-disable prettier/prettier */

$(document).on("click", "#LOGOUT-button", logOut);

//logout function that runs FB's logout function and empties the currentUser variables
function logOut(event) {
    event.preventDefault();

    firebase.auth().signOut().then(function () {
        // Sign-out successful.
        console.log("Sign-out successful.");
    }).catch(function (error) {
        // An error happened.
        console.log("Error: " + error);
    });

    // Bumps user back to index
    window.location.href = "/";

};