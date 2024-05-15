const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { VendaService } = require('./service/VendaService');
const app = express();
const port = 3000;
const adminRouter = require('./routes/adminRoutes');
const produtoRouter = require('./routes/produtoRoutes');
const vendaRouter = require('./routes/vendaRoutes');

app.use(bodyParser.json());
app.use('/admin', adminRouter);
app.use('/produto', produtoRouter);
app.use('/venda', vendaRouter);

app.get('/products', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'produto.html'));
});
app.get('/vendas', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'vendas.html'));
});
app.get('/calendar', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'calendar.html'));
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
