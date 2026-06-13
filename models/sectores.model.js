const db = require('../config/db');

const SectoresModel = {

   async getAll() {

      const [rows] = await db.query(`
         SELECT
            id,
            sector,
            subcategoria
         FROM sectores
         ORDER BY subcategoria ASC, sector ASC
      `);

      return rows;
   },

   async create(data) {

      const { sector, subcategoria } = data;

      const [result] = await db.query(`
         INSERT INTO sectores (
            sector,
            subcategoria
         )
         VALUES (?, ?)
      `, [sector, subcategoria]);

      return result;
   },

   async update(id, data) {

      const { sector, subcategoria } = data;

      const [result] = await db.query(`
         UPDATE sectores
         SET sector = ?, subcategoria = ?
         WHERE id = ?
      `, [sector, subcategoria, id]);

      return result;
   },

   async delete(id) {

      const [result] = await db.query(`
         DELETE FROM sectores
         WHERE id = ?
      `, [id]);

      return result;
   },

   async stats() {

      const [[total]] = await db.query(`
         SELECT COUNT(*) total
         FROM sectores
      `);

      return {
         total: total.total || 0,
         ingresados_hoy: 0,
         modificados_hoy: 0,
         eliminados_hoy: 0,
         ultima_actualizacion: null
      };
   }

};

module.exports = SectoresModel;
