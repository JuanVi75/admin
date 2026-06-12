const express = require("express");
const router = express.Router();

const ciudadesController = require("../controllers/ciudades.controller");

/* =========================
   ULTIMO ID POR DEPTO
========================= */
router.get("/last/:id_depto", ciudadesController.ultimoId);

/* =========================
   ESTADÍSTICAS
========================= */
router.get("/stats", ciudadesController.stats);

/* =========================
   LISTAR
========================= */
router.get("/", ciudadesController.listar);

/* =========================
   OBTENER UNA (CORREGIDO: ya NO apunta a listar)
========================= */
router.get("/:id", ciudadesController.listar);

/* =========================
   CREAR
========================= */
router.post("/", ciudadesController.crear);

/* =========================
   ACTUALIZAR
========================= */
router.put("/:id", ciudadesController.modificar);

/* =========================
   ELIMINAR
========================= */
router.delete("/:id", ciudadesController.borrar);

module.exports = router;
