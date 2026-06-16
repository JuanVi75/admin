// controllers/clientes.controller.js

const ClientesModel = require("../models/clientes.model");

/* =========================
   LISTAR
========================= */
function listar(req, res) {
   ClientesModel.getAllClientes((err, data) => {
      if (err) {
         return res.status(500).json({ error: err.message });
      }
      res.json(data);
   });
}

/* =========================
   POR ID
========================= */
function obtener(req, res) {
   ClientesModel.getClienteById(req.params.id, (err, data) => {
      if (err) {
         return res.status(500).json({ error: err.message });
      }
      res.json(data);
   });
}

/* =========================
   CREAR
========================= */
function crear(req, res) {
   ClientesModel.createCliente(req.body, (err, result) => {
      if (err) {
         return res.status(500).json({ error: err.message });
      }
      res.json({ message: "Cliente creado", result });
   });
}

/* =========================
   ACTUALIZAR
========================= */
function actualizar(req, res) {
   ClientesModel.updateCliente(req.params.id, req.body, (err, result) => {
      if (err) {
         return res.status(500).json({ error: err.message });
      }
      res.json({ message: "Cliente actualizado", result });
   });
}

/* =========================
   ELIMINAR
========================= */
function eliminar(req, res) {
   ClientesModel.deleteCliente(req.params.id, (err, result) => {
      if (err) {
         return res.status(500).json({ error: err.message });
      }
      res.json({ message: "Cliente eliminado", result });
   });
}

module.exports = {
   listar,
   obtener,
   crear,
   actualizar,
   eliminar
};
