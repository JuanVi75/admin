const express = require("express");
const router = express.Router();

const db = require("../config/db");

/* =========================
   GET ALL
========================= */
router.get("/", (req, res) => {

    const sql = "SELECT id, depto FROM departamentos";

    db.query(sql, (err, results) => {
        if (err) {
            console.log("Error MySQL departamentos:", err);
            return res.status(500).json({ error: "Error en base de datos" });
        }

        res.json(results);
    });
});

/* =========================
   CREATE
   (ID lo digita el usuario)
========================= */
router.post("/", (req, res) => {

    const { id, depto } = req.body;

    const sql = "INSERT INTO departamentos (id, depto) VALUES (?, ?)";

    db.query(sql, [id, depto], (err, result) => {
        if (err) {
            console.log("Error INSERT departamentos:", err);
            return res.status(500).json({ error: "Error al crear departamento" });
        }

        res.json({ ok: true, message: "Departamento creado" });
    });
});

/* =========================
   UPDATE (MODIFICAR)
========================= */
router.put("/:id", (req, res) => {

    const id = req.params.id;
    const { depto } = req.body;

    const sql = "UPDATE departamentos SET depto = ? WHERE id = ?";

    db.query(sql, [depto, id], (err, result) => {
        if (err) {
            console.log("Error UPDATE departamentos:", err);
            return res.status(500).json({ error: "Error al modificar departamento" });
        }

        res.json({ ok: true, message: "Departamento actualizado" });
    });
});

/* =========================
   DELETE (BORRAR)
========================= */
router.delete("/:id", (req, res) => {

    const id = req.params.id;

    const sql = "DELETE FROM departamentos WHERE id = ?";

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.log("Error DELETE departamentos:", err);
            return res.status(500).json({ error: "Error al borrar departamento" });
        }

        res.json({ ok: true, message: "Departamento eliminado" });
    });
});

module.exports = router;
