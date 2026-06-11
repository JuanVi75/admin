const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.json([
        { id: 1, depto: "Antioquia (modular OK)" },
        { id: 2, depto: "Cundinamarca (modular OK)" }
    ]);
});

module.exports = router;
