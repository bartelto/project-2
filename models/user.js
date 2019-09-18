module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    authId: DataTypes.STRING,
    screenName: DataTypes.STRING,
    imageUrl: DataTypes.STRING
  });

  User.associate = function(models) {
    // Associating User with GamePrefs
    // When a User is deleted, also delete any associated GamePrefs
    User.hasMany(models.GamePref, {
      onDelete: "cascade"
    });
  };

  return User;
};
