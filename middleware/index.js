var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middlewareObj = {
};
middlewareObj.checkCommentOwner = function (req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, comment){
            if(err){
                res.redirect("back")
            }
            else{
                if(comment.author.id.equals(req.user._id)){
                    next(); 
                }
                else{
                    res.redirect("back")
                }
            }
        })
    }
    else{
        res.redirect("back");_
    }
}
middlewareObj.checkOwner = function (req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, campground){
            if(campground.creator.id.equals(req.user._id)){
                return next();
            }
            else{
                res.redirect("back");
            }
        })
    }
    else{
        res.redirect("back");
    }
}
middlewareObj.isLogedIn = function (req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please login first");
    res.redirect("/login");
}
module.exports = middlewareObj;