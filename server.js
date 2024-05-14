const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
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
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
