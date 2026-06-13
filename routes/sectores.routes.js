const express = require('express');
const router = express.Router();
const SectoresController = require('../controllers/sectores.controller');

router.get('/', SectoresController.getAll);
router.post('/', SectoresController.create);
router.put('/:id', SectoresController.update);
router.delete('/:id', SectoresController.delete);
router.get('/stats', SectoresController.stats);

module.exports = router;
