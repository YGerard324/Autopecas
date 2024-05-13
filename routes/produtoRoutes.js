const express = require('express');
const router = express.Router();
const ProdutoService = require('../service/ProdutoService');

const produtoService = new ProdutoService();

router.post('/create', async (req, res) => {
  try {
    const novoProduto = await produtoService.create(req.body);
    res.json(novoProduto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const produto = await produtoService.getProdutoById(id);
    res.json(produto);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const produtos = await produtoService.getAll();
    res.json(produtos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const novoProdutoData = req.body;
    const produtoAtualizado = await produtoService.update(id, novoProdutoData);
    res.json(produtoAtualizado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await produtoService.delete(id);
    res.json({ message: 'Produto excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/search/:termoDeBusca', async (req, res) => {
  try {
    const termoDeBusca = req.params.termoDeBusca;
    const produtos = await produtoService.searchByNameOrMarca(termoDeBusca);
    res.json(produtos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
