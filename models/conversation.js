module.exports = function(sequelize, DataTypes) {
  var Conversation = sequelize.define("Conversation", {
    title: DataTypes.STRING
  });

  Conversation.associate = function(models) {
    // Associating Thread with Message
    // When a Thread is deleted, also delete any associated Messages
    Conversation.hasMany(models.Message, {
      onDelete: "cascade"
    });
  };

  return Conversation;
};
