const express = require("express");
const router = express.Router();

const db = require("../config/db");

// GET /departamentos (DATA REAL)
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

module.exports = router;
