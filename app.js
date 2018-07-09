const   express     = require("express"),
        app         = express(),
        bodyParser  = require("body-parser"),
        mongoose    = require("mongoose"),
        Campground  = require("./models/campground"),
        Comment     = require("./models/comment"),
        seedDB      = require("./seeds");
    

mongoose.connect("mongodb://localhost/yelp_camp_v3");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
seedDB();
//Connect to the yelp_cap databse




// home page
app.get("/", function(req, res){
    res.render("landing");
});


//INDEX - show all campgrounds - this get all the campgrounds from the mongodb database
app.get("/campgrounds", function(req,res){  
    //Get All campgrounds from DB
    //when the function find() is done then it call the callback and render the data
    Campground.find({}, function(err, allCampgrounds){//callback
        if(err){
            console.log(err);
        }else{
                            //name          data
            res.render("campgrounds/index",{campgrounds:allCampgrounds});      //then render it
        }
    });
    
});

//CREATE - add new campground to DB
app.post("/campgrounds", function(req,res){
    let name = req.body.name;
    let image = req.body.image;
    let desc = req.body.description;
    
    let newCampGround = {name: name, image: image, description: desc};
    Campground.create(newCampGround, function(err, newlyCreated){
        if(err){
            console.log(err);
        }else{
            //redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    });
});


//NEW - show form to create new campground - Restful convention show the form to send the data to post/campgrouds
app.get("/campgrounds/new", function(req, res){
    res.render("campgrounds/new");    
});

//the new has to come before SHOW
//SHOW - shows more infor about a specific campground
app.get("/campgrounds/:id", function(req, res){
    //find campground with provided ID
    Campground.findById(req.params.id).
    populate("comments").
    exec(function(err, foundCampground){
        if(err){
            console.log(err);   
        }else{
            console.log(foundCampground);
            //render show template with that campground
            res.render("campgrounds/show",{campground: foundCampground});
        };
    });
});

   //==================//
  // COMMENTS ROUTES  //
 //==================//
 app.get("/campgrounds/:id/comments/new", function(req, res){
    // find campground by id 
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new", {campground: campground});
        }
    })
    

 });

 app.post("/campgrounds/:id/comments", function(req, res){
     //Lookup campground by ID
     Campground.findById(req.params.id, function(err, campground){
         if(err){
             console.log(err);
             res.redirect("/campgrounds");
         }else{
            //Create a new comment
            //connect new comment to campground
            //redirect to campground show page.
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                }else{
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campgrounds/'+campground._id);
                }
            })
         }
     })
     
 })

const port = 3000;
app.listen(port, function(){
    console.log(`The YelpCamp Server has started! http://127.0.0.1:${port}/`)
});