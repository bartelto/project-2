module.exports = function(sequelize, DataTypes) {
  var GamePref = sequelize.define("GamePref", {
    gameId: DataTypes.STRING,
    gameName: DataTypes.STRING
  });

  GamePref.associate = function(models) {
    // We're saying that a GamePref should belong to a User
    // A GamePref can't be created without a User due to the foreign key constraint
    GamePref.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return GamePref;
};
