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
            this.pool.query("select username, email, password, address, city, zip_code from users where username = ?",[username] ,async (err, results) => {
                if(err) return reject(err);
                if(results.length > 0){
                    const passwordCorrect = await this.checkPassword(password, results[0].password);

                    console.log(passwordCorrect);
                    if(passwordCorrect){
                        const {username, email, address, city, zip_code} = results[0];
                        return resolve({username, email, address, city, zip_code});
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
}

const database = new Database();

module.exports = database;