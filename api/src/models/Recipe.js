const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  sequelize.define('Recipe', {
    id: { 
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
      unique: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imagen: {
      type: DataTypes.STRING,
      allowNull: false
    },
    resumen: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    score: { //healthScore 
      type: DataTypes.REAL,
      allowNull: false
    },
    instrucciones: { 
      type: DataTypes.TEXT,
      allowNull: false
    },
    creada: {
      type: DataTypes.BOOLEAN
    }
  },{
    timestamps: false
  });
};

 