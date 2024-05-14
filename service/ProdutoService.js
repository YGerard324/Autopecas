const ProdutoRepository = require("../repository/ProdutoRepository");

class ProdutoService {
  constructor() {
    this.produtoRepository = new ProdutoRepository();
  }

  async add(produtoData) {
    try {
      console.log("Dados do produto recebidos no serviço:", produtoData);
      const novoProduto = await this.produtoRepository.add(produtoData);
      return novoProduto;
    } catch (err) {
      console.error(err);ss
      throw err;
    }
  }

  async getProdutoById(id) {
    try {
      const produto = await this.produtoRepository.getProdutoById(id);
      return produto;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async getAll() {
    try {
      const produtos = await this.produtoRepository.getAll();
      return produtos;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async update(id, novoProdutoData) {
    try {
      const produto = await this.produtoRepository.getProdutoById(id);
      if (!produto) {
        throw new Error("Produto não encontrado");
      }
      await this.produtoRepository.update(id, novoProdutoData);
      return { ...produto, ...novoProdutoData };
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async delete(id) {
    try {
      await this.produtoRepository.remove(id);
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async searchByNameOrMarca(termoDeBusca) {
    try {
      const produtos = await this.produtoRepository.search(termoDeBusca);
      return produtos;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async verificarEstoque(idProduto, quantidadeDesejada) {
    try {
      const produto = await this.produtoRepository.getProdutoById(idProduto);
      if (!produto) {
        throw new Error("Produto não encontrado");
      }
      return produto.qtd >= quantidadeDesejada;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}

module.exports = ProdutoService;
