const express = require("express");
const router = express.Router();

const ContactosController = require("../controllers/clienteContactos.controller");

/* =========================
   CLIENTES
========================= */
router.get("/clientes", ContactosController.listarClientes);

/* =========================
   STATS
========================= */
router.get("/stats", ContactosController.stats);

/* =========================
   LISTAR CONTACTOS
========================= */
router.get("/", ContactosController.listar);

/* =========================
   CREAR
========================= */
router.post("/", ContactosController.crear);

/* =========================
   MODIFICAR
========================= */
router.put("/:id", ContactosController.modificar);

/* =========================
   BORRAR
========================= */
router.delete("/:id", ContactosController.borrar);

module.exports = router;
