const mysql = require("mysql");
const bcrypt = require("bcrypt");

class Database{
    constructor(){
        this.pool = mysql.createPool({
            connectionLimit: 10,
            password: "",
            user: "root",
            database: "proy_db",
            host: "localhost",
            port: "3306"
        });
    }

    categories(){
        return new Promise((resolve, reject) => {
            this.pool.query("select * from categories", (err, results) => {
                if(err) return reject(err);
                return resolve(results);
            })
        })
    }

    books(){
        return new Promise((resolve, reject) => {
            this.pool.query("select * from books", (err, results) => {
                if(err) return reject(err);
                return resolve(results);
            })
        })
    }

    book(book_id){
        return new Promise((resolve, reject) => {
            this.pool.query("select * from books where id = ?", [book_id], (err, results) => {
                if(err) return reject(err);
                return resolve(results);
            })
        })
    }

    products(book_id){
        return new Promise((resolve, reject) => {
            this.pool.query("select * from book_product where book_id = ?",[book_id] ,(err, results) => {
                if(err) return reject(err);
                return resolve(results);
            })
        })
    }

    authors(){
        return new Promise((resolve, reject) => {
            this.pool.query("select * from authors" ,(err, results) => {
                if(err) return reject(err);
                return resolve(results);
            })
        })
    }

    author(author_id){
        return new Promise((resolve, reject) => {
            this.pool.query("select * from authors where id = ?",[author_id] ,(err, results) => {
                if(err) return reject(err);
                return resolve(results);
            })
        })
    }

    login(username, password){
        return new Promise((resolve, reject) => {
            this.pool.query("select id, username, email, password, address, city, zip_code from users where username = ?",[username] ,async (err, results) => {
                if(err) return reject(err);
                if(results.length > 0){
                    const passwordCorrect = await this.checkPassword(password, results[0].password);

                    //console.log(passwordCorrect);
                    if(passwordCorrect){
                        const {id, username, email, address, city, zip_code} = results[0];
                        return resolve({id, username, email, address, city, zip_code});
                    }else{
                        return resolve(false);
                    }
                }else{
                    return resolve(false);
                }
            })
        })
    }

    async checkPassword(sent_password, stored_password){
        return await bcrypt.compare(sent_password, stored_password);
    }

    register(username, raw_password, email, address, city, zip_code){
        return new Promise(async (resolve, reject) => {
            const available = await this.userAvailable(username);
            if(available){
                const hashedPassword = await bcrypt.hash(raw_password, 10);
                this.pool.query(
                    "insert into users (username, email, password, address, city, zip_code) values (?, ?, ?, ?, ?, ?) ", 
                    [username, email, hashedPassword, address, city, zip_code] ,
                    (err, results) => {
                        if(err) return reject(err);
                        return resolve(results.affectedRows > 0);
                })
            }else{
                return resolve(false);
            }
        })
    }

    userAvailable(username){
        return new Promise(async (resolve, reject) => {
            this.pool.query("select count(*) as amount from users where username = ?", [username], (err, results) => {
                if(err) return reject(err);
                return resolve(results[0].amount === 0);
            })
        });
    }

    purchase(cartLines, userId){
        let total = cartLines.map(el => el.PRICE * el.AMOUNT).reduce((acc, next) => acc + next);

        return new Promise(async (resolve, reject) => {
            this.pool.query(
            "insert into purchases (date, total_price, user_id) values (now(), ?, ?)", 
            [total, userId] ,
            (err, results) => {
                if(err) return reject(err);
                const insertedId = results.insertId;
                cartLines.forEach(async line => {
                    await this.insertSinglePurchaseLine(line, insertedId);
                })
                return resolve(results.affectedRows > 0);
            })
        })
    }

    insertSinglePurchaseLine(line, purchase_id){
        return new Promise(async (resolve, reject) => {
            this.pool.query("insert into product_purchase (id_product, id_purchase, amount) values (?, ?, ?)", [line.PRODUCT_ID, purchase_id, line.AMOUNT], (err, results) => {
                if(err) return reject(err);
                return resolve(results.affectedRows > 0);
            })
        });
    }

    getPurchases(uid){
        return new Promise((resolve, reject) => {
            this.pool.query("select id, date, total_price from purchases where user_id = ?",[uid] ,async (err, results) => {
                if(err) return reject(err);
                let purchases = await Promise.all(results.map(async (purchase) => {
                    purchase.LINES = await this.getPurchaseLines(purchase.id);
                    return purchase;
                }))

                return resolve(purchases);
            })
        })
    }

    getPurchaseLines(purchaseId){
        const query = `
            select books.id as book_id, title, type, price, amount 
            from product_purchase, book_product, books 
            where books.id = book_product.book_id 
            and book_product.id = product_purchase.id_product 
            and id_purchase = ?`;
        return new Promise((resolve, reject) => {
            this.pool.query(query, [purchaseId] ,(err, results) => {
                if(err) return reject(err);
                return resolve(results);
            })
        })
    }
}

const database = new Database();

module.exports = database;