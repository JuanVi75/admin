const express = require('express');
const router = express.Router();

const SectoresController = require('../controllers/sectores.controller');

router.get('/sectores', SectoresController.getAll);

router.post('/sectores', SectoresController.create);

router.put('/sectores/:id', SectoresController.update);

router.delete('/sectores/:id', SectoresController.delete);

router.get('/sectores/stats', SectoresController.stats);

module.exports = router;