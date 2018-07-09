const   express     = require("express"),
        app         = express(),
        bodyParser  = require("body-parser"),
        mongoose    = require("mongoose"),
        Campground  = require("./models/campground"),
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
            res.render("index",{campgrounds:allCampgrounds});      //then render it
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
    res.render("new.ejs");    
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
            res.render("show",{campground: foundCampground});
        };
    });
});

const port = 3000;
app.listen(port, function(){
    console.log(`The YelpCamp Server has started! http://127.0.0.1:${port}/`)
});