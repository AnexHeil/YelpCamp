var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var middleware = require("../middleware/index");
router.get("/register", function(req, res){
    res.render("register.ejs", {page: 'register'});
})
router.post("/register", function(req, res){
    var newUser = {username: req.body.username, firstName: req.body.firstName, lastName: req.body.lastName, avatar: req.body.avatar, email: req.body.email};
    if(req.body.admincode === "secretcode123"){
        newUser.isAdmin = true;
    }
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register.ejs", {err: err.message});
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/campgrounds");
        })
    })
})
router.get("/login", function(req, res){
    res.render("login.ejs", {message: req.flash("error"), page: "login"});
})
router.post("/login", passport.authenticate("local", {
        successRedirect: "/campgrounds",
        failureRedirect: "/login" 
    }), 
    function(req, res){
})
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Loged out");
    res.redirect("/campgrounds");
})
router.get("/users/:id", function(req, res){
    User.findById(req.params.id, function(err, user){
        if(err){
            req.flash("error", "Something went wrong");
            res.redirect("/");
        }
        res.render("users/show.ejs", {user: user});
    })
})
module.exports = router;