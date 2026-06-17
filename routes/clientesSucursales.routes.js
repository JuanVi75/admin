const express = require("express");
const router = express.Router();

const SucursalesController = require("../controllers/clientesSucursales.controller");

/* =========================
   CLIENTES
========================= */
router.get("/clientes", SucursalesController.listarClientes);

/* =========================
   STATS
========================= */
router.get("/stats", SucursalesController.stats);

/* =========================
   LISTAR SUCURSALES
========================= */
router.get("/", SucursalesController.listar);

/* =========================
   CREAR
========================= */
router.post("/", SucursalesController.crear);

/* =========================
   MODIFICAR
========================= */
router.put("/:id", SucursalesController.modificar);

/* =========================
   BORRAR
========================= */
router.delete("/:id", SucursalesController.borrar);

module.exports = router;