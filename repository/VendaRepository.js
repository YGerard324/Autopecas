const { Venda, Produto, ProdutoVenda } = require("../data/dbContext");

class VendaRepository {
  constructor() {}

  async create(produtos) {
    try {
        const novaVenda = await Venda.create({ finalizada: false });
        for (const produto of produtos) {
            const produtoDB = await Produto.findByPk(produto.produtoId);
            if (produtoDB && produtoDB.qtd >= produto.qtd) {
                await ProdutoVenda.create({
                    produtoId: produto.produtoId,
                    vendaId: novaVenda.id,
                    qtd: produto.qtd
                });

                // Atualize a quantidade do produto
                await produtoDB.decrement('qtd', { by: produto.qtd });
            } else {
                throw new Error(`Produto com ID ${produto.produtoId} não encontrado ou estoque insuficiente.`);
            }
        }

      return novaVenda;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async getSaleById(id) {
    try {
      const venda = await Venda.findByPk(id, {
        include: [{ model: Produto, through: ProdutoVenda }]
      });
      return venda;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async getAll() {
    try {
      const vendas = await Venda.findAll({
        include: [{ model: Produto, through: ProdutoVenda }]
      });
      return vendas;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async update(id, newData) {
    try {
      const venda = await Venda.findByPk(id);
      if (!venda) {
        throw new Error('Venda não encontrada');
      }
      await venda.update(newData);
      return venda;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async delete(id) {
    try {
      const venda = await Venda.findByPk(id);
      if (!venda) {
        throw new Error('Venda não encontrada');
      }
      await venda.destroy();
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}

module.exports = VendaRepository;
