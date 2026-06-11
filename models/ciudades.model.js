// model/ciudades.js

const db = require("../db"); // conexión MySQL (ajusta si tu archivo se llama diferente)

const Ciudades = {};

/**
 * LISTAR TODAS LAS CIUDADES
 */
Ciudades.getAll = async function () {
   const [rows] = await db.query(`
      SELECT 
         c.id,
         c.municipio,
         c.id_depto,
         d.depto AS departamento
      FROM ciudades c
      LEFT JOIN departamentos d ON d.id = c.id_depto
      ORDER BY c.id DESC
   `);

   return rows;
};

/**
 * OBTENER UNA CIUDAD POR ID
 */
Ciudades.getById = async function (id) {
   const [rows] = await db.query(`
      SELECT * FROM ciudades WHERE id = ?
   `, [id]);

   return rows[0];
};

/**
 * CREAR CIUDAD
 */
Ciudades.create = async function (data) {
   const { id, municipio, id_depto } = data;

   await db.query(`
      INSERT INTO ciudades (id, municipio, id_depto)
      VALUES (?, ?, ?)
   `, [id, municipio, id_depto]);

   return true;
};

/**
 * ACTUALIZAR CIUDAD
 */
Ciudades.update = async function (id, data) {
   const { municipio, id_depto } = data;

   await db.query(`
      UPDATE ciudades
      SET municipio = ?, id_depto = ?
      WHERE id = ?
   `, [municipio, id_depto, id]);

   return true;
};

/**
 * ELIMINAR CIUDAD
 */
Ciudades.delete = async function (id) {
   await db.query(`
      DELETE FROM ciudades WHERE id = ?
   `, [id]);

   return true;
};

/**
 * TRAER ULTIMO ID POR DEPARTAMENTO (para lógica de incremento)
 */
Ciudades.getLastIdByDepto = async function (id_depto) {
   const [rows] = await db.query(`
      SELECT MAX(id) AS lastId
      FROM ciudades
      WHERE id_depto = ?
   `, [id_depto]);

   return rows[0]?.lastId || null;
};

module.exports = Ciudades;