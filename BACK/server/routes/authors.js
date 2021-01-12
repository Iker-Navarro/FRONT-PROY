const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", async (req, res, next) => {
    try{
        let results = await db.authors();
        res.json(results);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get("/:id", async (req, res, next) => {
    try{
        let results = await db.author(req.params.id);
        res.json(results[0]);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = router;