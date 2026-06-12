const Ciudades = require("../model/ciudades.model");
const db = require("../config/db");
/**
 * LISTAR CIUDADES
 */
exports.getAll = async (req, res) => {
   try {
      const data = await Ciudades.getAll();
      res.json(data);
   } catch (err) {
      res.status(500).json({ error: "Error listando ciudades" });
   }
};

/**
 * OBTENER UNA CIUDAD
 */
exports.getById = async (req, res) => {
   try {
      const data = await Ciudades.getById(req.params.id);
      res.json(data);
   } catch (err) {
      res.status(500).json({ error: "Error obteniendo ciudad" });
   }
};

/**
 * CREAR CIUDAD
 */
exports.create = async (req, res) => {
   try {
      const { id, municipio, id_depto } = req.body;

      await Ciudades.create({ id, municipio, id_depto });

      res.json({ ok: true });
   } catch (err) {
      res.status(500).json({ error: "Error creando ciudad" });
   }
};

/**
 * ACTUALIZAR CIUDAD
 */
exports.update = async (req, res) => {
   try {
      await Ciudades.update(req.params.id, req.body);

      res.json({ ok: true });
   } catch (err) {
      res.status(500).json({ error: "Error actualizando ciudad" });
   }
};

/**
 * ELIMINAR CIUDAD
 */
exports.delete = async (req, res) => {
   try {
      await Ciudades.delete(req.params.id);

      res.json({ ok: true });
   } catch (err) {
      res.status(500).json({ error: "Error eliminando ciudad" });
   }
};

/**
 * OBTENER ULTIMO ID POR DEPTO (para generación automática)
 */
exports.getLastIdByDepto = async (req, res) => {
   try {
      const data = await Ciudades.getLastIdByDepto(req.params.id_depto);

      res.json({ lastId: data });
   } catch (err) {
      res.status(500).json({ error: "Error obteniendo último ID" });
   }
};
