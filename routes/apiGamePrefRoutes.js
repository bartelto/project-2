var db = require("../models");

module.exports = function(app) {
  // Get all GamePrefs for a particular userId
  app.get("/api/gameprefs/:userId", function(req, res) {
    db.GamePref.findAll({ where: { userId: req.params.userId } }).then(function(
      dbGamePrefs
    ) {
      res.json(dbGamePrefs);
    });
  });

  // Create a new GamePref
  app.post("/api/gameprefs", function(req, res) {
    db.GamePref.create(req.body).then(function(dbGamePref) {
      res.json(dbGamePref);
    });
  });

  // Delete a GamePref by id
  app.delete("/api/gameprefs/:id", function(req, res) {
    db.GamePref.destroy({ where: { id: req.params.id } }).then(function(
      dbGamePref
    ) {
      res.json(dbGamePref);
    });
  });
};
