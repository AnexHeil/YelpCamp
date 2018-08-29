var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware/index.js")
router.get("/campgrounds/:id/comments/new", middleware.isLogedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            res.redirect("/campgrounds/" + req.params.id + "/comments");
        }
        else{
            res.render("comments/new.ejs", {campground: campground});
        }
    })
})
router.post("/campgrounds/:id/comments", middleware.isLogedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        }
        else{
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                }
                else{
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            })
        }
    })
})

router.get("/campgrounds/:id/comments/:comment_id/edit", middleware.checkCommentOwner, function(req, res){
    Comment.findById(req.params.comment_id, function(err, comment){
        if(err){
            res.redirect("back");
        }
        else{
            res.render("comments/edit.ejs", {comment: comment, campground_id: req.params.id})
        }
    })
})
router.put("/campgrounds/:id/comments/:comment_id", middleware.checkCommentOwner, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, comment){
        if(err){
            res.redirect("back");
        }
        else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
})
router.delete("/campgrounds/:id/comments/:comment_id", middleware.checkCommentOwner, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err, comment){
        if(err){
            res.redirect("back");
        }
        else{
            res.redirect("back");
        }
    })
})
module.exports = router;