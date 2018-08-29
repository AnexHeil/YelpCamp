var express = require("express"),
    app = express(),
    request = require("request"),
    bodyPars = require("body-parser"),
    mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    seedDB = require("./seeds"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    User = require("./models/user"),
    flash = require("connect-flash"),
    method = require("method-override");

mongoose.connect("mongodb://localhost:27017/YelpCamp", { useNewUrlParser: true });

var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    authRoutes = require("./routes/index");


// seedDB();

app.use(method("_method"));

app.use(bodyPars.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(flash());
app.use(require("express-session")({
    secret: "The human mind will prevail",
    saveUninitialized: false,
    resave: false
}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});
app.use(commentRoutes);
app.use(campgroundRoutes);
app.use(authRoutes);

app.get("/", function(req, res){
    res.render("landing.ejs");
})


//Auth routes


app.listen("3000", function(){
    console.log("Started!!!");
})