'use strict';
module.exports = (sequelize, DataTypes) => {
  const Meal = sequelize.define('Meal', {
    name: {type: DataTypes.STRING,
           allowNull: false
         },
  }, {});
  Meal.associate = function(models) {
    // associations can be defined here
  };
  return Meal;
};
