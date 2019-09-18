module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    authId: DataTypes.STRING,
    screenName: DataTypes.STRING,
    imageUrl: DataTypes.STRING
  });
  return User;
};
