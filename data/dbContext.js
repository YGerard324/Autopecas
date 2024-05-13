const dbConfig = require("../config/dbConfig");
const { Sequelize, DataTypes } = require("sequelize");

console.log("Dialeto: " + dbConfig.DIALECT);

const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USERNAME,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.DIALECT,
    port: dbConfig.PORT,
  }
);

const Admin = require("../data/Admin")(sequelize, DataTypes);
const Produto = require("../data/Produto")(sequelize, DataTypes);
const Venda = require("../data/Venda")(sequelize, DataTypes);
const ProdutoVenda = require("../data/ProdutoVenda")(sequelize, DataTypes);

Produto.belongsToMany(Venda, { through: ProdutoVenda });
Venda.belongsToMany(Produto, { through: ProdutoVenda });

sequelize
  .authenticate()
  .then(() => {
    console.log("Conectado com sucesso!");
  })
  .catch((err) => {
    console.log("Erro ao tentar conectar: " + err);
  });

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Tabelas criadas com sucesso!");
  })
  .catch((err) => {
    console.log("Erros: " + err);
  });

module.exports = { Admin, Produto, Venda, ProdutoVenda };