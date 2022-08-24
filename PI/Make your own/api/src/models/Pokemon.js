const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
  
  sequelize.define('Pokemon', {
    id:{
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    hp: {//vida
      type: DataTypes.INTEGER
    },
    attack: {
      type: DataTypes.INTEGER
    },
    defense: {
      type: DataTypes.INTEGER
    },
    speed: {
      type: DataTypes.INTEGER
    },
    height: {
      type: DataTypes.INTEGER
    },
    weight: {
      type: DataTypes.INTEGER
    },
    image: {
      type: DataTypes.STRING
      
    },

    createdInDb: { 
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false 
    }
  });
};
