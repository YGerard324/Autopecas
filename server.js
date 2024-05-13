const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000; // ou qualquer porta que você preferir
const adminRouter = require('./routes/adminRoutes');
const produtoRouter = require('./routes/produtoRoutes');
const vendaRouter = require('./routes/vendaRoutes');

app.use(bodyParser.json());
app.use('/admin', adminRouter);
app.use('/produto', produtoRouter);
app.use('/venda', vendaRouter);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
