const AdminRepository = require("./repository/AdminRepository");
const ProdutoRepository = require("./repository/ProdutoRepository");
const VendaRepository = require("./repository/VendaRepository");

class App {
    constructor() {}

    async init() {
        try {
            const adminRepository = new AdminRepository();
            const produtoRepository = new ProdutoRepository();
            const vendaRepository = new VendaRepository();

            await adminRepository.add({ name: "Testesx", email: "tesxste@teste.com", password: "123" });
            
            const produto = await produtoRepository.add({ name: "TestesProd", marca: "Testes", qtd: 25, custo: 5, valorVenda: 12 });
            console.log(`Produto "${produto.name}" adicionado com sucesso.`);
            const vendaProdutos = [{ produtoId: 1, qtd: 10 }];
            const novaVenda = await vendaRepository.create(vendaProdutos);
            console.log(`Venda criada com ID: ${novaVenda.id}`);
            
        } catch (error) {
            console.error("Erro na inicialização:", error);
        }
    }
}

const app = new App();
app.init();
