const express = require("express");
const router = express.Router();

const controller = require("../controllers/departamentos.controller");

// GET - listar departamentos
router.get("/", controller.listar);

module.exports = router;
