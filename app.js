require("dotenv").config()
const express = require("express");
const routes = require("./app/routes");

const app = express();
const serverLog = () => {
    console.log("SERVER RUNNING ON PORT", server.address().port);
}

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api", routes);

const server = app.listen(process.env.SERVER_PORT, serverLog)

