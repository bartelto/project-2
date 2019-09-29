/* eslint-disable no-unused-vars */
/* eslint-disable indent */
/* eslint-disable prettier/prettier */
//

//########################################################################
//This file needs to be included on any pages that utilize user authentification(Which is all of them)

//This is the user's Firebase connection variable(empty until login)
var currentFBUser;
//This is the user's information that's been saved to the database(empty until login)
var currentUser;

//variables for input fields
var $userEmail = $("#user-email-input");
var $userPassword = $("#user-password-input");

//variable for button
var $loginBtn = $("#LOGIN-button");
var $logoutBtn = $("#LOGOUT-button");


//logout function that runs FB's logout function and empties the currentUser variables
var logOut = function (event) {
    event.preventDefault();

    firebase.auth().signOut().then(function () {
        // Sign-out successful.
    }).catch(function (error) {
        // An error happened.
    });

    $userEmail.val("");
    $userPassword.val("");
    currentFBUser = "";
    currentUser;

    // Bumps user back to index
    window.location.href = "/";

};

//Login function that uses FB's login function and locates user from DB. Both are saved into coresponding currentUser variables.
var logIn = function (event) {
    event.preventDefault();

    var login = {
        email: $userEmail.val().trim(),
        pass: $userPassword.val().trim()
    };

    //Logging into Firebase 
    firebase
        .auth()
        .signInWithEmailAndPassword(login.email, login.pass)
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        });

    //If FB login successful, this variable will no longer be empty. The findAccount function below
    // only queries if successfuly passed a valid email with the currentFBUser.
    currentFBUser = firebase.auth().currentUser;
    if (currentFBUser) {
        console.log(currentFBUser.email);
    } else {
        console.log("Login failed.");
    }

    $.get("/api/users/" + currentFBUser.email, function (data) {
        // log the data to our console
        console.log(data);
        currentUser = data;

    }).then(function () {
        console.log(currentUser);
        console.log(currentUser.authId);

        //If the login was successful and user was found on DB, redirect to matches page.
        if (currentUser.authId !== null) {
            window.location.href = "/matches";
        } else {

            //If currentUser doesn't populate from the DB, clears all login fields and alerts user to try again.
            firebase.auth().signOut();
            currentFBUser = "";
            currentUser = {
                authId: "",
                screenName: "",
                imageUrl: ""
            };

            alert("Login Failed. Please try again.");
        }
    });

    // Console logging userinfo to check if connected properly to Firebase
    currentFBUser.providerData.forEach(function (profile) {
        console.log("Sign-in provider: " + profile.providerId);
        console.log("  Provider-specific UID: " + profile.uid);
        console.log("  Name: " + profile.displayName);
        console.log("  Email: " + profile.email);
        console.log("  Photo URL: " + profile.photoURL);
    });



    $userEmail.val("");
    $userPassword.val("");



};

//Login button on register page
$loginBtn.on("click", logIn);

//Logout button on landing page
$logoutBtn.on("click", logOut);


firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      /*var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;*/
      console.log(user.email + " is logged in.");
    } else {
      // User is signed out.
      console.log("No user logged in.");
    }
  });