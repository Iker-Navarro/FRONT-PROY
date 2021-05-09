const express = require("express");
const router = express.Router();
const db = require("../db");
const auth = require("../auth/auth.js")


router.post("/", auth.authenticateToken, async (req, res, next) => {
    try{
        if (await db.purchase(req.body.cart, req.user.id)){
            res.sendStatus(200)
        }
        else{
            res.sendStatus(500);
        }
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get("/all", auth.authenticateToken, async (req, res, next) => {
    try{
        purchases = await db.getPurchases(req.user.id);
        if (purchases){
            res.json(purchases);
        }
        else{
            res.sendStatus(500);
        }
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});


module.exports = router;