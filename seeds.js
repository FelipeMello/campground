const mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment =      require("./models/comment");

const data = [
    {
        name: "Cloud's Rest",
        image: "https://pixabay.com/get/e83db50a21f4073ed1584d05fb1d4e97e07ee3d21cac104496f0c97ea0e4b5bd_340.jpg",
        description: "Hello this i smy comment"
    },
    {
        name: "Temp's Rest",
        image: "https://pixabay.com/get/e83db50a21f4073ed1584d05fb1d4e97e07ee3d21cac104496f0c97ea0e4b5bd_340.jpg",
        description: "Hello this i smy comment"
    },
    {
        name: "Fire",
        image: "https://pixabay.com/get/e835b20e29f0003ed1584d05fb1d4e97e07ee3d21cac104496f0c97ea0e4b5bd_340.jpg",
        description: "Hello this i smy comment"
    }
]
function seedDB() {
    //Remove all campgrounds
    Campground.remove({}, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("removed campgrounds!");
            //add a few campgrounds
            data.forEach(function (seed) {
                Campground.create(seed, function (err, campground) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("added campground");
                        //create a comment
                        Comment.create({
                            text:"This place is great, but I wish there was internet",
                            author:"Homer"
                        },function(err, comment){
                            if(err){
                                console.log(err);
                            }else{
                                campground.comments.push(comment);
                                campground.save();
                                console.log("created new comment");
                            }
                        })
                    }
                });
            });
        }
    });

}


module.exports = seedDB;