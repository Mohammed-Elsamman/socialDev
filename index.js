const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const post = require('./routes/api/posts');
const group = require('./routes/api/groups')

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//DB config
const db = require('./config/keys').mognoURI;
const dbLocal = require('./config/keys').mongoLocal;
//connect to MongoDB
mongoose
    .connect(dbLocal,{ useNewUrlParser: true })
    .then(() => console.log("done"))
    .catch(err => {
        console.log(err);
    });

//passport middleware
app.use(passport.initialize());

// passport config
require("./config/passport")(passport);

app.use("/api/user", users);
app.use("/api/profile", profile);
app.use("/api/posts", post);
app.use("/api/groups", group);

const port = process.env.PORT || 5000;

app.get("/", (req, res) => res.send("Mohamed El-Samman"));

app.listen(port, () => {
    console.log(`server running on port => ${port}`)
});
