require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");

//FireBase SDKs
var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/apiUserRoutes")(app);
require("./routes/apiGamePrefRoutes")(app);
require("./routes/apiConversationRoutes")(app);
require("./routes/apiMessageRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: true };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}


//This adds FireBase to the application
var firebaseConfig = {
  apiKey: "AIzaSyCJHh2ifng2yuFDtWh_ANlr3JGTQQUl2Do",
  authDomain: "groupproject-2.firebaseapp.com",
  databaseURL: "https://groupproject-2.firebaseio.com",
  projectId: "groupproject-2",
  storageBucket: "",
  messagingSenderId: "632422965301",
  appId: "1:632422965301:web:407c34c8dba8e9848ad17c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function () {
  app.listen(PORT, function () {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
