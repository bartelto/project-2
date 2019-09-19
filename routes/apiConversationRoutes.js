var db = require("../models");

module.exports = function(app) {
  // Get all Conversations
  app.get("/api/conversations", function(req, res) {
    db.Conversation.findAll({}).then(function(dbConversations) {
      res.json(dbConversations);
    });
  });

  // Get all Conversations for a particular userId (NOT id)
  app.get("/api/conversations/:userId", function(req, res) {
    db.Conversation.findAll({ userId: req.params.userId }).then(function(
      dbConversations
    ) {
      res.json(dbConversations);
    });
  });

  // Create a new Conversation
  app.post("/api/conversations", function(req, res) {
    db.Conversation.create(req.body).then(function(dbConversation) {
      res.json(dbConversation);
    });
  });

  // Delete an Conversation by id
  app.delete("/api/conversations/:id", function(req, res) {
    db.Conversation.destroy({ where: { id: req.params.id } }).then(function(
      dbConversation
    ) {
      res.json(dbConversation);
    });
  });
};
