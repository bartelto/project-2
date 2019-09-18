var db = require("../models");

module.exports = function(app) {
  // Get all users
  app.get("/api/users", function(req, res) {
    db.User.findAll({ include: [db.GamePref] }).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });

  // Get a user by id
  app.get("/api/users/:id", function(req, res) {
    db.User.findOne({
      where: { id: req.params.id },
      include: [db.GamePref]
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  // Create a new user
  app.post("/api/users", function(req, res) {
    db.User.create(req.body).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  // Update a user
  app.put("/api/users", function(req, res) {
    db.User.update(req.body, { where: { id: req.body.id } }).then(function(
      dbUser
    ) {
      res.json(dbUser);
    });
  });

  // Delete a user by id
  app.delete("/api/users/:id", function(req, res) {
    db.User.destroy({ where: { id: req.params.id } }).then(function(dbUser) {
      res.json(dbUser);
    });
  });
};
