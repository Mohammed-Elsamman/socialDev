const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require('./routes/api/users');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use("/api/user",users);

const port = process.env.PORT || 5000;

app.get("/", (req, res) => res.send("Mohamed El-Samman"));

const db = require('./config/keys').mogoURI

mongoose
    .connect(db)
    .then(() => console.log("done"))
    .catch(err => console.log(err));

app.listen(port, () => {
    console.log(`server running on port => ${port}`)
});
