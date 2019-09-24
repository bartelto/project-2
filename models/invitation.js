module.exports = function(sequelize) {
  var Invitation = sequelize.define("Invitation", {});

  Invitation.associate = function(models) {
    // An Invitation can't be created without a User and Conversation due to the foreign key constraint
    Invitation.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });

    Invitation.belongsTo(models.Conversation, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Invitation;
};
