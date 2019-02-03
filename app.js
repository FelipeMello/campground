const   express         = require("express"),
        app             = express(),
        bodyParser      = require("body-parser"),
        mongoose        = require("mongoose"),
        passport        = require("passport"),
        localStrategy   = require("passport-local"),
        campground      = require("./models/campground"),
        comment         = require("./models/comment"),
        User            = require("./models/user"),
        seedDB          = require("./seeds");
    

//Using mongoose to connect to cloud mongodb Atlas
mongoose.connect("mongodb+srv://felipe:!!Fsheelaghs2!!@cluster0-vz2p4.mongodb.net/test?retryWrites=true");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
seedDB();
//Connect to the yelp_cap databse

//PASSPORT Configuration
app.use(require("express-session")({
    secret : "My secret password Muahahaha!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// home page
app.get("/", function(req, res){
    res.render("landing");
});


//INDEX - show all campgrounds - this get all the campgrounds from the mongodb database
app.get("/campgrounds", function(req,res){  
    //Get All campgrounds from DB
    //when the function find() is done then it call the callback and render the data
    campground.find({}, function(err, allCampgrounds){//callback
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
    campground.create(newCampGround, function(err, newlyCreated){
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
    campground.findById(req.params.id).
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
    campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new", {campground: campground});
        }
    })
    

 });

 app.post("/campgrounds/:id/comments", function(req, res){
     //Lookup campground by ID
     campground.findById(req.params.id, function(err, campground){
         if(err){
             console.log(err);
             res.redirect("/campgrounds");
         }else{
            //Create a new comment
            //connect new comment to campground
            //redirect to campground show page.
            comment.create(req.body.comment, function(err, comment){
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
     
 });

//==================
 //AUTH ROUTES
//==================
//show the register form
app.get("/register", (req,res)=>{
    res.render("register");
})
//handle sign up logic
app.post("/register", (req, res)=>{
    const newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, (err, user)=>{
        if(err){
            console.log(err);
            res.render("register");
        }
        passport.authenticate("local"),(req, res, ()=>{
            res.redirect("/campgrounds");
        })
    });
})

const port = 3001;
app.listen(port, function(){
    console.log(`The YelpCamp Server has started! http://127.0.0.1:${port}/`)
});