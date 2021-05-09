const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", async (req, res, next) => {
    try{
        let results = await db.books();

        let books = await Promise.all(results.map(async (book) => {
            resultset = await db.products(book.ID);
            book.PRODUCTS = resultset;
            return book;
        }))
        res.json(books);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get("/:id", async (req, res, next) => {
    try{
        let results = await db.book(req.params.id);
        let book = results[0];

        book.PRODUCTS = await db.products(results[0].ID);

        res.json(book);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = router;
