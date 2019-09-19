module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    authId: DataTypes.STRING,
    screenName: DataTypes.STRING,
    imageUrl: DataTypes.STRING
  });

  User.associate = function(models) {
    // Associating User with GamePref and Message
    // When a User is deleted, also delete any associated GamePrefs and Messages
    User.hasMany(models.GamePref, {
      onDelete: "cascade"
    });

    User.hasMany(models.Message, {
      onDelete: "cascade"
    });
  };

  return User;
};
