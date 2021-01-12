const express = require("express");
const router = express.Router();
const db = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


router.post("/", async (req, res, next) => {
    try{
        //const token = jwt.sign()
        const logedUser = await db.login(req.body.username, req.body.password);
        if(logedUser){
            const accessToken = jwt.sign(logedUser, process.env.ACCESS_TOKEN_SECRET);
            logedUser.token = accessToken;
            res.json(logedUser);

        }else{
            res.sendStatus(401);
        }
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});


module.exports = router;