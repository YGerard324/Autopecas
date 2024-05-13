const express = require('express');
const router = express.Router();
const VendaService = require('../service/VendaService');

const vendaService = new VendaService();

router.post('/create', async (req, res) => {
  try {
    const novaVenda = await vendaService.createSale(req.body.produtos);
    res.json(novaVenda);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
