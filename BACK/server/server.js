require("dotenv").config();

const express = require("express");
const path = require("path");
const auth = require("./auth/auth");

const app = express();

// // Configurar cabeceras y cors??
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
 
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.use("/api/categories", require("./routes/categories"))
app.use("/api/books", require("./routes/books"))
app.use("/api/authors", require("./routes/authors"))
app.use("/api/auth/register", require("./routes/register"))
app.use("/api/auth/login", require("./routes/login"))

app.listen(process.env.PORT || "5000", () => {
    console.log("SERVER RUNNING ON PORT " + (process.env.PORT || "5000"));
})
