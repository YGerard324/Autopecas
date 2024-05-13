const express = require('express');
const router = express.Router();
const AdminService = require('../service/AdminService');

const adminService = new AdminService();

router.post('/register', async (req, res) => {
  try {
    const novoAdmin = await adminService.registerAdmin(req.body);
    res.json(novoAdmin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await adminService.authenticateAdmin(email, password);
    res.json(admin);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const admin = await adminService.getAdminById(id);
    res.json(admin);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const admins = await adminService.getAllAdmins();
    res.json(admins);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
