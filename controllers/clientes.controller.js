// controllers/clientes.controller.js

const ClientesModel = require("../models/clientes.model");

/* =========================
   LISTAR
========================= */
async function listar(req, res) {
   try {
      const data = await ClientesModel.getAllClientes();
      res.json(data);
   } catch (err) {
      res.status(500).json({ error: err.message });
   }
}

/* =========================
   POR ID
========================= */
async function obtener(req, res) {
   try {
      const data = await ClientesModel.getClienteById(req.params.id);
      res.json(data);
   } catch (err) {
      res.status(500).json({ error: err.message });
   }
}

/* =========================
   CREAR
========================= */
async function crear(req, res) {
   try {
      const result = await ClientesModel.createCliente(req.body);
      res.json({ message: "Cliente creado", result });
   } catch (err) {
      res.status(500).json({ error: err.message });
   }
}

/* =========================
   ACTUALIZAR
========================= */
async function actualizar(req, res) {
   try {
      const result = await ClientesModel.updateCliente(req.params.id, req.body);
      res.json({ message: "Cliente actualizado", result });
   } catch (err) {
      res.status(500).json({ error: err.message });
   }
}

/* =========================
   ELIMINAR
========================= */
async function eliminar(req, res) {
   try {
      const result = await ClientesModel.deleteCliente(req.params.id);
      res.json({ message: "Cliente eliminado", result });
   } catch (err) {
      res.status(500).json({ error: err.message });
   }
}

module.exports = {
   listar,
   obtener,
   crear,
   actualizar,
   eliminar
};