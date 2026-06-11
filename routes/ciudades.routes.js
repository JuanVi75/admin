const express = require("express");
const router = express.Router();

const ciudadesController = require("../controller/ciudades.controller");

// LISTAR
router.get("/", ciudadesController.getAll);

// OBTENER UNA
router.get("/:id", ciudadesController.getById);

// CREAR
router.post("/", ciudadesController.create);

// ACTUALIZAR
router.put("/:id", ciudadesController.update);

// ELIMINAR
router.delete("/:id", ciudadesController.delete);

// ULTIMO ID POR DEPTO
router.get("/last/:id_depto", ciudadesController.getLastIdByDepto);

module.exports = router;