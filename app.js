require("dotenv").config();

const express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    flash = require("connect-flash"),
    passport = require("passport"),
    localStrategy = require("passport-local"),
    expressSession = require("express-session"),
    methodOverride = require("method-override"),
    User = require("./models/user"),
    seedDB = require("./seeds");

// require routes
const commentRoutes = require("./routes/comments"),
    beachRoutes = require("./routes/beaches"),
    indexRoutes = require("./routes/index");

mongoose
    .connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to DB!");
    })
    .catch(err => {
        console.log("ERROR", err.message);
    });

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(methodOverride("_method")); // tell express to use "method-override" and to call on it with "_method"
app.use(express.static(__dirname + "/public")); // "dirname" will result in "/workspace/BackEndIntro/YelpCamp/v#"
app.use(flash()); // flash message to user if not logged in while performing an action
// seedDB();

app.locals.moment = require("moment");

// passport configuration
app.use(
    expressSession({
        secret: "This is a secret",
        resave: false,
        saveUninitialized: false
    })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// assign variable to all routes. currentUser = req.user  |  req.user = username user logged into as
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error"); // assign variable "error" to all routes
    res.locals.success = req.flash("success");
    next();
});

app.use(indexRoutes);
app.use("/beaches", beachRoutes); // defaults all routes to start with "/beaches"
app.use("/beaches/:id/comments", commentRoutes); // defer to line 2 of /routes/comments.js

let port = process.env.PORT || 3000;

app.listen(port, () => console.log("YelpBeach server started!"));
