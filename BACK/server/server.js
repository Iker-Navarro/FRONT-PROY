const express = require("express");
const apiRouter = require("./routes");

const app = express();

app.use(express.json());
app.use("/api/test", apiRouter)

app.listen(process.env.PORT || "5000", () => {
    console.log("SERVER RUNNING ON PORT " + (process.env.PORT || "5000"));
})