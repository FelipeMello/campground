const express = require("express");
const app = express();
const bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

const campgrounds =[
        {name:"Salmon Creek", image:"https://pixabay.com/get/ea36b70928f21c22d2524518b7444795ea76e5d004b0144392f5c97da7e9b3_340.jpg"},
        {name:"Granite Hill", image:"https://pixabay.com/get/e83db50a21f4073ed1584d05fb1d4e97e07ee3d21cac104497f7c471a3edb1be_340.jpg"},
        {name:"Mountain Goat's Rest", image:"https://pixabay.com/get/e837b5092af3083ed1584d05fb1d4e97e07ee3d21cac104497f7c471a3edb1be_340.jpg"},
        {name:"Salmon Creek", image:"https://pixabay.com/get/ea36b70928f21c22d2524518b7444795ea76e5d004b0144392f5c97da7e9b3_340.jpg"},
        {name:"Granite Hill", image:"https://pixabay.com/get/e83db50a21f4073ed1584d05fb1d4e97e07ee3d21cac104497f7c471a3edb1be_340.jpg"},
        {name:"Mountain Goat's Rest", image:"https://pixabay.com/get/e837b5092af3083ed1584d05fb1d4e97e07ee3d21cac104497f7c471a3edb1be_340.jpg"},
        
        {name:"Salmon Creek", image:"https://pixabay.com/get/ea36b70928f21c22d2524518b7444795ea76e5d004b0144392f5c97da7e9b3_340.jpg"},
        {name:"Granite Hill", image:"https://pixabay.com/get/e83db50a21f4073ed1584d05fb1d4e97e07ee3d21cac104497f7c471a3edb1be_340.jpg"},
        {name:"Mountain Goat's Rest", image:"https://pixabay.com/get/e837b5092af3083ed1584d05fb1d4e97e07ee3d21cac104497f7c471a3edb1be_340.jpg"},
        {name:"Salmon Creek", image:"https://pixabay.com/get/ea36b70928f21c22d2524518b7444795ea76e5d004b0144392f5c97da7e9b3_340.jpg"},
        {name:"Granite Hill", image:"https://pixabay.com/get/e83db50a21f4073ed1584d05fb1d4e97e07ee3d21cac104497f7c471a3edb1be_340.jpg"},
        {name:"Mountain Goat's Rest", image:"https://pixabay.com/get/e837b5092af3083ed1584d05fb1d4e97e07ee3d21cac104497f7c471a3edb1be_340.jpg"}
        
    ];
    

// home page
app.get("/", function(req, res){
    res.render("landing");
});


//this show us all the campgrounds
app.get("/campgrounds", function(req,res){                            //name          data
    res.render("campgrounds",{campgrounds:campgrounds});
});

//create a new campground
app.post("/campgrounds", function(req,res){
//    res.send("You hit the post route");
    let name = req.body.name;
    let image = req.body.image;
    let newCampGround = {name: name, image: image};
    //get data from form and add to campground array
    campgrounds.push(newCampGround);//adding into the array
    
    //redirect back to campgrounds page
    res.redirect("/campgrounds");
    //the default is to redirect as a get request
});

//this shows the form
// Restful convention show the form to send the data to post/campgrouds
app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");    
})



app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server has started!");
})