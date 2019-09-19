var db = require("../models");

module.exports = function(app) {
  // Get all Messages
  app.get("/api/messages", function(req, res) {
    db.Message.findAll({}).then(function(dbMessages) {
      res.json(dbMessages);
    });
  });

  // Get all Messages for a particular ConversationId (NOT id)
  app.get("/api/messages/:ConversationId", function(req, res) {
    db.Message.findAll({
      ConversationId: req.params.ConversationId,
      include: [db.User]
    }).then(function(dbMessages) {
      res.json(dbMessages);
    });
  });

  // Create a new Message
  app.post("/api/messages", function(req, res) {
    db.Message.create(req.body).then(function(dbMessages) {
      res.json(dbMessages);
    });
  });

  // Delete an Message by id
  app.delete("/api/messages/:id", function(req, res) {
    db.Message.destroy({ where: { id: req.params.id } }).then(function(
      dbMessages
    ) {
      res.json(dbMessages);
    });
  });
};
