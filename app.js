const   express     = require("express"),
        app         = express(),
        bodyParser  = require("body-parser"),
        mongoose    = require("mongoose");

//Connect to the yelp_cap databse
mongoose.connect("mongodb://localhost/yelp_camp");

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

// SCHEMA SETUP
const campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});
//compiling into a model
const Campground = mongoose.model("Campground", campgroundSchema);

// home page
app.get("/", function(req, res){
    res.render("landing");
});


//this get all the campgrounds from the mongodb database
app.get("/campgrounds", function(req,res){  
    //Get All campgrounds from DB
    //when the function find() is done then it call the callback and render the data
    Campground.find({}, function(err, allCampgrounds){//callback
        if(err){
            console.log(err);
        }else{
                            //name          data
            res.render("campgrounds",{campgrounds:allCampgrounds});      //then render it
        }
    });
    
});

//create a new campground
app.post("/campgrounds", function(req,res){
        let name = req.body.name;
        let image = req.body.image;
        let newCampGround = {name: name, image: image};
        //get data from form and add to campground array
        //Create a new campground and save to DB
        Campground.create(newCampGround, function(err, newlyCreated){
            if(err){
                //send the user back to the page and tell the user what went wrong
                console.log(err);
            }else{
                //redirect back to campgrounds page
                res.redirect("/campgrounds");
            }
        });
    });
    

//this shows the form
// Restful convention show the form to send the data to post/campgrouds
app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");    
})



app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server has started!");
})