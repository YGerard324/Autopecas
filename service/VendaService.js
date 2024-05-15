const VendaRepository = require("../repository/VendaRepository");

class VendaService {
  constructor() {
    this.vendaRepository = new VendaRepository();
  }

  async createSale(produtos) {
    try {
      console.log("Dados da venda recebidos no serviço:", produtos);
      const novaVenda = await this.vendaRepository.create(produtos);
      return novaVenda;
    } catch (err) {
      console.error("Erro ao criar venda:", err);
      throw err;
    }
  }

  async getSaleById(id) {
    try {
      const venda = await this.vendaRepository.getSaleById(id);
      return venda;
    } catch (err) {
      console.error("Erro ao buscar venda por ID:", err);
      throw err;
    }
  }

  async getAllSales() {
    try {
      const vendas = await this.vendaRepository.getAll();
      return vendas;
    } catch (err) {
      console.error("Erro ao buscar todas as vendas:", err);
      throw err;
    }
  }

  async updateSale(id, newData) {
    try {
      const vendaAtualizada = await this.vendaRepository.update(id, newData);
      return vendaAtualizada;
    } catch (err) {
      console.error("Erro ao atualizar venda:", err);
      throw err;
    }
  }

  async deleteSale(id) {
    try {
      await this.vendaRepository.delete(id);
    } catch (err) {
      console.error("Erro ao excluir venda:", err);
      throw err;
    }
  }
  async getSalesReport(startDate, endDate) {
    try {
      const vendas = await Venda.findAll({
        where: {
          data: {
            [Op.between]: [startDate, endDate]
          }
        },
        include: [{ model: Produto, through: ProdutoVenda }]
      });
      return vendas;
    } catch (err) {
      console.error("Erro ao buscar relatório de vendas:", err);
      throw err;
    }
  }
}

module.exports = VendaService;
