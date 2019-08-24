'use strict';
module.exports = (sequelize, DataTypes) => {
  const Meal = sequelize.define('Meal', {
    name: {type: DataTypes.STRING,
           allowNull: false
         },
  }, {});
  Meal.associate = function(models) {
    Meal.belongsToMany(models.Food, {
      through: 'MealFood',
      as: 'foods',
      foreignKey: 'mealId'
    })
  };
  return Meal;
};
