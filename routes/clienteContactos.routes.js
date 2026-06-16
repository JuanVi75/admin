const express = require("express");
const router = express.Router();

const ContactosController = require("../controllers/clienteContactos.controller");

/* =========================
   LISTAR
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

/* =========================
   STATS
========================= */
router.get("/stats", ContactosController.stats);

module.exports = router;