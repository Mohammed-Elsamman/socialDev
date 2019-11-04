const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require('path');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const post = require('./routes/api/posts');
const group = require('./routes/api/groups')

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//DB config
const db = require('./config/keys').mongoURI;
// const db = require('./config/keys').mongoLocal;
//connect to MongoDB
mongoose
    .connect(db,{ useNewUrlParser: true })
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

//server static assets if in production
if(process.env.NODE_ENV === "production"){
    app.use(express.static('client/build'))
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build'))
    })

}

const port = process.env.PORT || 5000;

app.get("/", (req, res) => res.send("Mohamed El-Samman"));

app.listen(port, () => {
    console.log(`server running on port => ${port}`)
});
