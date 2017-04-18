var express = require("express"),
app         = express(),
bodyParser  = require("body-parser"),
mongoose    = require("mongoose");

//App Config
// mongoose.connect("mongodb://localhost/lovetoeat");


mongoose.connect("mongodb://lovetoeat:lovetoeat@ds163360.mlab.com:63360/lovetoeatreact");

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(bodyParser.json()) // handle json data;
app.use(bodyParser.urlencoded({ extended: true })); // handle URL-encoded data

//Mongoose/Model Config
var recipeSchema = new mongoose.Schema({
      name: String,
      description: String,
      ingredients: [
      {
        quantity: String,
        ingredient: String,
      }
      ],
      cloudinaryURL: String

});

var Recipe = mongoose.model("Recipe", recipeSchema);

//RESTful Routes

app.get("/", function(req,res){
 res.json({ message: 'API Initialized!'});
});

//INDEX ROUTE
app.get("/recipes", function(req,res){
 Recipe.find({}, function(err,recipes){
  if(err){
  console.log(err);
  } else {
  res.json({recipes: recipes});
  }
 });
});


//CREATE ROUTE
app.post("/recipes", function(req,res){
    console.log(req.body.recipes);
 Recipe.create(req.body.recipes, function(err, newRecipe){
  if(err) {
  console.log(err);
  } else {
  res.redirect("/recipes");
  }
  
 });
});


//EDIT ROUTE
app.get("/edit/:id", function(req,res) {
 Recipe.findById(req.params.id, function(err, foundRecipe){
  if(err){
  console.log("Something went wrong!");
  } else {
  res.json({foundRecipe: foundRecipe})}
  });
 });


// UPDATE ROUTE
app.put("/edit/:id", function(req, res){
 Recipe.findByIdAndUpdate(req.params.id, req.body.recipes, function(err, updatedRecipe){
  if(err){
  console.log(err);
  } else {
 console.log(updatedRecipe);
 updatedRecipe = req.body;
 console.log(updatedRecipe);
res.json(updatedRecipe);
 }
 });
  }
 );




//DELETE
app.delete("/recipes/:id", function(req,res){
 Recipe.findByIdAndRemove(req.params.id, function(err){
  if(err){
  res.redirect("/blogs");
  } else {

  console.log("deleted without a hitch");
  }
 });
});


console.log(process.env.PORT);
app.listen(8081, process.env.IP, function(){
 console.log("We are live!");
})