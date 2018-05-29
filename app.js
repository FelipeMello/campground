const express = require("express");
const app = express();

app.set("view engine", "ejs");

// home page
app.get("/", function(req, res){
    res.render("landing");
});


app.get("/campgrounds", function(req,res){
    const campgrounds =[
        {name:"Salmon Creek", image:"https://pixabay.com/get/ea36b70928f21c22d2524518b7444795ea76e5d004b0144392f5c97da7e9b3_340.jpg"},
        {name:"Granite Hill", image:"https://pixabay.com/get/e83db50a21f4073ed1584d05fb1d4e97e07ee3d21cac104497f7c471a3edb1be_340.jpg"},
        {name:"Mountain Goat's Rest", image:"https://pixabay.com/get/e837b5092af3083ed1584d05fb1d4e97e07ee3d21cac104497f7c471a3edb1be_340.jpg"}
    ]
                            //name          data
    res.render("campgrounds",{campgrounds:campgrounds});
});



app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server has started!");
})