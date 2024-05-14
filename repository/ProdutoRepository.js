const { Produto } = require("../data/dbContext");

class ProdutoRepository {
  constructor() {}

  async add(produto) {
    try {
      console.log("Dados do produto recebidos no repository:", produto);
      const row = await Produto.create(produto);
      return row;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async getProdutoById(id) {
    try {
      const row = await Produto.findByPk(id);
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

  async update(id, novoProdutoData) {
    try {
      const produto = await Produto.findOne({ where: { id } });
      if (!produto) {
        throw new Error("Produto não encontrado");
      }
      await Produto.update(novoProdutoData, { where: { id } });
      return novoProdutoData;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async remove(id) {
    try {
      const rowsAffected = await Produto.destroy({ where: { id } });
      if (rowsAffected === 0) {
        throw new Error("Produto não encontrado");
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async search(termoDeBusca) {
    try {
      const rows = await Produto.findAll({
        where: {
          [Op.or]: [
            { nome: { [Op.iLike]: `%${termoDeBusca}%` } },
            { marca: { [Op.iLike]: `%${termoDeBusca}%` } },
          ],
        },
      });
      return rows;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}

module.exports = ProdutoRepository;
