module.exports = function(sequelize, DataTypes) {
  var Message = sequelize.define("Message", {
    messageText: DataTypes.TEXT
  });

  Message.associate = function(models) {
    // A Message can't be created without a Conversation AND a User due to the foreign key constraint
    Message.belongsTo(models.Conversation, {
      foreignKey: {
        allowNull: false
      }
    });

    Message.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Message;
};
