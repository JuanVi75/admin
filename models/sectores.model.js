const db = require('../config/db');

const SectoresModel = {

   async getAll() {

      const [rows] = await db.query(`
         SELECT
            id,
            sector,
            subcategoria,
            created_at,
            updated_at
         FROM sectores
         WHERE is_deleted = 0
         ORDER BY subcategoria ASC, sector ASC
      `);

      return rows;
   },

   async create(data) {

      const { sector, subcategoria } = data;

      const [result] = await db.query(`
         INSERT INTO sectores (
            sector,
            subcategoria,
            created_at,
            updated_at,
            is_deleted
         )
         VALUES (
            ?,
            ?,
            CURDATE(),
            NOW(),
            0
         )
      `, [sector, subcategoria]);

      return result;
   },

   async update(id, data) {

      const { sector, subcategoria } = data;

      const [result] = await db.query(`
         UPDATE sectores
         SET
            sector = ?,
            subcategoria = ?,
            updated_at = NOW()
         WHERE id = ?
           AND is_deleted = 0
      `, [sector, subcategoria, id]);

      return result;
   },

   async delete(id) {

      const [result] = await db.query(`
         UPDATE sectores
         SET
            is_deleted = 1,
            deleted_at = NOW()
         WHERE id = ?
      `, [id]);

      return result;
   },

   async stats() {

      const [[total]] = await db.query(`
         SELECT COUNT(*) total
         FROM sectores
         WHERE is_deleted = 0
      `);

      const [[ingresados]] = await db.query(`
         SELECT COUNT(*) ingresados_hoy
         FROM sectores
         WHERE created_at = CURDATE()
           AND is_deleted = 0
      `);

      const [[modificados]] = await db.query(`
         SELECT COUNT(*) modificados_hoy
         FROM sectores
         WHERE DATE(updated_at) = CURDATE()
           AND is_deleted = 0
      `);

      const [[eliminados]] = await db.query(`
         SELECT COUNT(*) eliminados_hoy
         FROM sectores
         WHERE DATE(deleted_at) = CURDATE()
           AND is_deleted = 1
      `);

      const [[ultima]] = await db.query(`
         SELECT MAX(updated_at) ultima_actualizacion
         FROM sectores
         WHERE is_deleted = 0
      `);

      return {
         total: total.total || 0,
         ingresados_hoy: ingresados.ingresados_hoy || 0,
         modificados_hoy: modificados.modificados_hoy || 0,
         eliminados_hoy: eliminados.eliminados_hoy || 0,
         ultima_actualizacion: ultima.ultima_actualizacion
      };
   }

};

module.exports = SectoresModel;
