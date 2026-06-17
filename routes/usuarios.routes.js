const express = require("express");
const router = express.Router();

const UsuariosController = require("../controllers/usuarios.controller");

/* =========================
   LISTAR
========================= */
router.get("/", UsuariosController.listar);

/* =========================
   STATS
========================= */
router.get("/stats", UsuariosController.stats);

/* =========================
   CREAR
========================= */
router.post("/", UsuariosController.crear);

/* =========================
   MODIFICAR
========================= */
router.put("/:id", UsuariosController.modificar);

/* =========================
   BORRAR
========================= */
router.delete("/:id", UsuariosController.borrar);

module.exports = router;