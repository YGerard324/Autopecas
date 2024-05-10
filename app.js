// const AdminRepository = require("./repository/AdminRepository");
const ProdutoRepository = require("./repository/ProdutoRepository");


// let adminRepository = new AdminRepository();
let produtoRepository = new ProdutoRepository();

// adminRepository.add({ name: "Teste", email: "teste@teste.com", password: "123" });
produtoRepository.add({ name:"TesteProd" , marca:"Teste" , qtd: 25 , custo: 5 , valorVenda: 12 });
