const express = require("express");
const router = express.Router();

const Departamentos = require("../controllers/departamentos.controller");

/* =========================
   GET ALL (SOLO ACTIVOS)
========================= */
router.get("/", Departamentos.listar);

/* =========================
   STATS DASHBOARD
========================= */
router.get("/stats", Departamentos.stats);

/* =========================
   CREATE
========================= */
router.post("/", Departamentos.crear);

/* =========================
   UPDATE
========================= */
router.put("/:id", Departamentos.modificar);

/* =========================
   DELETE (LÓGICO)
========================= */
router.delete("/:id", Departamentos.borrar);

module.exports = router;
