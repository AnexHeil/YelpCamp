var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var data = [
    {   
        name: "Aokigahara",
        image: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Aokigahara_forest_04.jpg",
        description: "A famous Japanese forest of deadmen. Pure and wild. A perfect place to commit suicide" 
    },
    {
        name: "Heavens Lake",
        image: "https://i.pinimg.com/originals/53/c0/87/53c0873ddcc598d399818e9d366120ed.jpg",
        description: "A pure water, no humans at all. Beautiful roks and plants. Ideal place to rest from city life" 
    },
    {
        name: "Hells Gate",
        image: "http://www.hellsgateairtram.com/experiences/events/above_hells_gate_airtram.jpg",
        description: "It's the perfect place for those who prefer risk and active rest. You'l know what fear is. Welcome to Hells Gate" 
    }
]
function seedDB(){
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        // else{
        //     console.log("Removed campgrounds!");
        // } 
        // data.forEach(function(seed){
        //     Campground.create(seed, function(err, campground){
        //         if(err){
        //             console.log(err);
        //         }
        //         else{
        //             console.log("Added a campground");
        //         }
        //         Comment.create({
        //             text: "This place is great, but I wish there was an internet",
        //             author : "Homer"
        //         }, 
        //             function(err, comment){
        //                 if(err){
        //                     console.log(err);
        //                 }
        //                 else{
        //                     campground.comments.push(comment);
        //                     campground.save();
        //                     console.log("Created new comment")
        //                 }
        //             })
        //     })
        // })
    });
}
module.exports = seedDB;
