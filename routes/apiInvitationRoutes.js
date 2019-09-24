var db = require("../models");

module.exports = function(app) {
  // Get all Invitations
  app.get("/api/invitations", function(req, res) {
    db.Invitation.findAll({}).then(function(dbInvitations) {
      res.json(dbInvitations);
    });
  });

  // Get all Invitations for a particular userId (NOT id)
  app.get("/api/invitations/:userId", function(req, res) {
    db.Invitation.findAll({
      where: { UserId: req.params.userId },
      include: [db.Conversation]
    }).then(function(dbInvitations) {
      res.json(dbInvitations);
    });
  });

  // Create a new Invitation
  app.post("/api/invitations", function(req, res) {
    db.Invitation.create(req.body).then(function(dbInvitation) {
      res.json(dbInvitation);
    });
  });

  // Delete an Invitation by id
  app.delete("/api/invitations/:id", function(req, res) {
    db.Invitation.destroy({ where: { id: req.params.id } }).then(function(
      dbInvitation
    ) {
      res.json(dbInvitation);
    });
  });
};
