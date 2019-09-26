/* eslint-disable no-unused-vars */
/* eslint-disable indent */
/* eslint-disable prettier/prettier */

//##################################
//This file is only needed on profileCreation page


//variables for input fields
var $userEmail = $("#user-email-input");
var $userPassword = $("#user-password-input");
var $userName = $("#user-name-input");
var $userImg = $("#user-imageURL-input");

//variable for button
var $registerBtn = $("#save-profile-button");

var API = {
    newUser: function (User) {
        return $.ajax({
            headers: {
                "Content-Type": "application/json"
            },
            type: "POST",
            url: "api/users/",
            data: JSON.stringify(User)
        });
    }
    //Left as object incase more functions are wanted on this page.
};

// handleFormSubmit is called whenever we submit a new user
// Save the new user to the db and refresh the list
var newUserSubmit = function (event) {
    event.preventDefault();

    //Saving the input fields values directly into the user object
    var User = {
        authId: $userEmail.val().trim(),
        screenName: $userName.val().trim(),
        imageUrl: $userImg.val().trim()
    };

    var pass = {
        password: $userPassword.val().trim()
    };

    if (!(User.authId || pass.password)) {
        alert("You must enter an email and password");
        return;
    } else if (!User.screenName) {
        alert("You must enter a screen name.");
        return;
    }

    //Creating the user in Firebase
    firebase
        .auth()
        .createUserWithEmailAndPassword(User.authId, pass.password)
        .then(function (result) {
            return result.user.updateProfile({
                displayName: User.screenName,
                photoURL: User.imageUrl
            });
        })
        .catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
        });

    $userEmail.val("");
    $userPassword.val("");
    $userName.val("");
    $userImg.val("");

    API.newUser(User);
    // .then(function () {
    // window.location.href = "/matches";
    // });


};

//Submit button on register page
$registerBtn.on("click", newUserSubmit);
