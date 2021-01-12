const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", async (req, res, next) => {
    try{
        if (await db.register(req.body.username, req.body.password, req.body.email, req.body.address, req.body.city, req.body.zip_code)){
            res.json({registered: true});
        }
        else{
            res.sendStatus(409);
        }
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});


module.exports = router;