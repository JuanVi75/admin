// routes/clientes.routes.js

const express = require("express");
const router = express.Router();

const ClientesController = require("../controllers/clientes.controller");

/* =========================
   RUTAS CRUD CLIENTES
========================= */

// LISTAR
router.get("/", ClientesController.listar);

// OBTENER POR ID
router.get("/:id", ClientesController.obtener);

// CREAR
router.post("/", ClientesController.crear);

// ACTUALIZAR
router.put("/:id", ClientesController.actualizar);

// ELIMINAR
router.delete("/:id", ClientesController.eliminar);

module.exports = router;