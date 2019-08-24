'use strict';
module.exports = (sequelize, DataTypes) => {
  const MealFood = sequelize.define('MealFood', {
    foodId: {type: DataTypes.INTEGER,
             allowNull: false,
             references: {
               model: 'Food',
               key: 'id'
             }
           },
           
    mealId: {type: DataTypes.INTEGER,
             allowNull: false,
             references: {
               model: 'Meal',
               key: 'id'
             }
           }

  }, {});
  MealFood.associate = function(models) {
    // associations can be defined here
  };
  return MealFood;
};
