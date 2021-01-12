const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", async (req, res, next) => {
    try{
        let results = await db.categories();
        let categories = results.filter(category => !category.FATHER);

        categories.forEach(category =>{
            category.CHILDREN = results.filter((cat) => cat.FATHER === category.ID);
        })
        
        res.json(categories);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = router;
