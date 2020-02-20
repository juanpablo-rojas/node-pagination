'use strict';
module.exports = (sequelize, DataTypes) => {
  const Fake = sequelize.define(
    'Fake',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {}
  );
  return Fake;
};
