const express = require('express');
const router = express.Router();
const VendaService = require('../service/VendaService');

const vendaService = new VendaService();

router.post('/create', async (req, res) => {
    try {
        console.log("Dados do produto recebidos no servidor:", req.body);
        // const produtos = req.body; 
        const novaVenda = await vendaService.createSale(req.body);
        res.json(novaVenda);
    } catch (error) {
        console.error("Erro ao criar venda:", err);
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const venda = await vendaService.getSaleById(id);
        res.status(200).json(venda);
    } catch (err) {
        console.error("Erro ao buscar venda por ID:", err);
        res.status(500).json({ error: "Erro ao buscar venda por ID" });
    }
});

router.get('/', async (req, res) => {
    try {
        const vendas = await vendaService.getAllSales();
        res.status(200).json(vendas);
    } catch (err) {
        console.error("Erro ao buscar todas as vendas:", err);
        res.status(500).json({ error: "Erro ao buscar todas as vendas" });
    }
});

module.exports = router;
