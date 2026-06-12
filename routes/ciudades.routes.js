const express = require("express");
const router = express.Router();

const ciudadesController = require("../controllers/ciudades.controller");

/* =========================
   ULTIMO ID POR DEPTO
========================= */
router.get("/last/:id_depto", ciudadesController.ultimoId);

/* =========================
   LISTAR
========================= */
router.get("/", ciudadesController.listar);

/* =========================
   OBTENER UNA
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
