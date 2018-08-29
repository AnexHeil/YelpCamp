var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware/index.js")
router.get("/campgrounds", function(req, res){
    if(req.query.search){
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        Campground.find({name: regex}, function(err, allCampgrounds){
            if(err){
                console.log(err);
            }
            else{
                res.render("campground/campgrounds.ejs", {campgrounds: allCampgrounds, currentUser: req.user, page: "campgrounds"});
            }
        })
    }
    else{
        Campground.find({}, function(err, allCampgrounds){
            if(err){
                console.log(err);
            }
            else{
                res.render("campground/campgrounds.ejs", {campgrounds: allCampgrounds, currentUser: req.user, page: "campgrounds"});
            }
        })
    }
})
router.post("/campgrounds", middleware.isLogedIn, function(req, res){
    var name = req.body.name;
    var img = req.body.image;
    var desc = req.body.description;
    var price = req.body.price;
    console.log(req.user.id);
    Campground.create({
        name: name,
        image: img,
        description: desc,
        price: price,
        creator:{
            id: req.user.id,
            username: req.user.username
        }
    });
    res.redirect("/campgrounds");
})

router.get("/campgrounds/new", middleware.isLogedIn, function(req, res){
    res.render("campground/new.ejs");
})

router.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if (err){
            console.log(err);
        }
        else{
            res.render("campground/show.ejs", {campground: foundCampground});
        }
    })
})
router.put("/campgrounds/:id", middleware.checkOwner, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.data, function(err, campground){
        if(err){
            res.redirect("/campgrounds/" + req.params.id + "/edit");
        }
        else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
})
router.get("/campgrounds/:id/edit", middleware.checkOwner, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.data, function(err, campground){
        if(err){
            res.redirect("back");
        }
        else{
            res.render("campground/edit.ejs", {campground: campground});
        }
    })
})
router.delete("/campgrounds/:id", middleware.checkOwner, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            return res.redirect("/campgrounds/" + req.params.id);
        }
        res.redirect("/campgrounds");
    })
})
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}
function isLogedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}
module.exports = router;