const { Produto } = require("../data/dbContext");

class ProdutoRepository {
  constructor() {}

  async add(produto) {
    try {
      const row = await Produto.create(produto);
      return row;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async getProdutoById(id) {
    try {
      const row = await Produto(Sequelize, DataTypes).findByPk(id);
      return row;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async getAll() {
    try {
      const rows = await Produto.findAll();
      return rows;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}

module.exports = ProdutoRepository;