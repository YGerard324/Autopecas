const AdminRepository = require("../repository/AdminRepository");
const bcrypt = require("bcrypt");

class AdminService {
  constructor() {
    this.adminRepository = new AdminRepository();
  }

  async registerAdmin(adminData) {
    try {
      // Hash da senha antes de salvar no banco de dados
      const hashedPassword = await bcrypt.hash(adminData.password, 10);
      adminData.password = hashedPassword;
      
      const novoAdmin = await this.adminRepository.add(adminData);
      return novoAdmin;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async authenticateAdmin(email, password) {
    try {
      const admin = await this.adminRepository.getByEmail(email);
      if (!admin) {
        throw new Error("Email ou senha incorretos");
      }
      // Compara a senha fornecida com o hash da senha armazenada
      const isPasswordValid = await bcrypt.compare(password, admin.password);
      if (!isPasswordValid) {
        throw new Error("Email ou senha incorretos");
      }
      return admin;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async getAdminById(id) {
    try {
      const admin = await this.adminRepository.getAdminById(id);
      return admin;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async getAllAdmins() {
    try {
      const admins = await this.adminRepository.getAll();
      return admins;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}

module.exports = AdminService;
