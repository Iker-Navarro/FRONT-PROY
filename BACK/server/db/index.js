const mysql = require("mysql");

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

    all(){
        return new Promise((resolve, reject) => {
            this.pool.query("select * from users", (err, results) => {
                if(err) return reject(err);
                return resolve(results);
            })
        })
    }

    user(id){
        return new Promise((resolve, reject) => {
            this.pool.query("select * from users where id = ?", [id], (err, results) => {
                if(err) return reject(err);
                return resolve(results);
            })
        })
    }
}

const database = new Database();

module.exports = database;

/*
const mysql = require("mysql");

const pool = mysql.createPool({
    connectionLimit: 10,
    password: "",
    user: "root",
    database: "proy_db",
    host: "localhost",
    port: "3306"
});
let database = {};

database.all = () => {
    return new Promise((resolve, reject) => {
        pool.query("select * from users", (err, results) => {
            if(err) return reject(err);
            return resolve(results);
        })
    })
}

database.user = (id) => {
    return new Promise((resolve, reject) => {
        pool.query("select * from users where id = ?", [id], (err, results) => {
            if(err) return reject(err);
            return resolve(results);
        })
    })
}

module.exports = database;

*/