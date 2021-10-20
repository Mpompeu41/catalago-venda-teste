const Sequelize = require("sequelize");
const database = require("../database");

const Kimonos = database.define("kimonos", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  tamanho: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  cor: Sequelize.STRING,
  preco: {
    type: Sequelize.DECIMAL,
    allowNull: false,
  },
  imagem: {
    type: Sequelize.STRING,
    allowNull: false,
  },
},
{
  freezeTableName: true,
  timestamps: false, 
  createdAt: false,
  updatedAt: false,
});

module.exports = Kimonos;