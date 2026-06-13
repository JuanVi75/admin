const SectoresModel = require('../models/sectores.model');

const SectoresController = {

   async getAll(req, res) {
      try {

         const data = await SectoresModel.getAll();

         res.json(data);

      } catch (error) {

         console.error(error);
         res.status(500).json({
            error: 'Error obteniendo sectores'
         });

      }
   },

   async create(req, res) {
      try {

         const result = await SectoresModel.create(req.body);

         res.json({
            success: true,
            result
         });

      } catch (error) {

         console.error(error);
         res.status(500).json({
            error: 'Error creando sector'
         });

      }
   },

   async update(req, res) {
      try {

         const { id } = req.params;

         const result = await SectoresModel.update(id, req.body);

         res.json({
            success: true,
            result
         });

      } catch (error) {

         console.error(error);
         res.status(500).json({
            error: 'Error modificando sector'
         });

      }
   },

   async delete(req, res) {
      try {

         const { id } = req.params;

         const result = await SectoresModel.delete(id);

         res.json({
            success: true,
            result
         });

      } catch (error) {

         console.error(error);
         res.status(500).json({
            error: 'Error eliminando sector'
         });

      }
   },

   async stats(req, res) {
      try {

         const data = await SectoresModel.stats();

         res.json(data);

      } catch (error) {

         console.error(error);
         res.status(500).json({
            error: 'Error obteniendo estadísticas'
         });

      }
   }

};

module.exports = SectoresController;