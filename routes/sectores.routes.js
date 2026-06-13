const express = require('express');
const router = express.Router();
const SectoresController = require('../controllers/sectores.controller');

/* LISTAR */
router.get('/', SectoresController.listar);
/* CREAR */
router.post('/', SectoresController.crear);
/* MODIFICAR */
router.put('/:id', SectoresController.modificar);
/* ELIMINAR */
router.delete('/:id', SectoresController.borrar);
/* STATS */
router.get('/stats', SectoresController.stats);

module.exports = router;
