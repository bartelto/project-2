module.exports = function(sequelize, DataTypes) {
  var Conversation = sequelize.define("Conversation", {
    title: DataTypes.STRING
  });

  Conversation.associate = function(models) {
    // Associating Conversation with Message
    // When a Conversation is deleted, also delete any associated Messages
    Conversation.hasMany(models.Message, {
      onDelete: "cascade"
    });
  };

  return Conversation;
};
