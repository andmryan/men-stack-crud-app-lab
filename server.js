// Configuration of Server
const dotenv = require("dotenv");
dotenv.config();

// Required Packages
const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");

// Express
const app = express();

// App Initialization
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan("dev"));

// Connection
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// Imports
const Bird = require("./models/birds.js")

// Routes
// Set the home route
app.get("/", async (req, res) =>{
    // Have it render the 'home' page.
    res.render("home.ejs")
});

// Set a route for adding a new bird to the list of birds.
app.get("/birds/new", (req, res) =>{
    // render the form for adding a new bird
    res.render("birds/new.ejs")
});

// Set a route to edit a bird's page based on its ID.
app.get("/birds/edit/:birdId", async (req, res) => {
    const foundBird = await Bird.findById(req.params.birdId);
    // console.log(foundFruit);
    res.render("birds/edit.ejs", { bird : foundBird });
});

// Set a route to view a bird's page based on its ID.
app.get("/birds/:birdId", async (req, res) =>{
    // Make a constant that isolates a single bird from the database
    const foundBird = await Bird.findById(req.params.birdId);
    // console.log(birdID);
    
    // Render the page using the bird's ID
    res.render("birds/show.ejs", { bird: foundBird }); 
});

// Set a route to delete a bird's page based on its ID.
app.delete("/birds/:birdId", async (req, res) => {
    await Bird.findByIdAndDelete(req.params.birdId);
    res.redirect("/birds");
});

// Set a route to edit the form of a bird based on its ID.
app.put("/birds/:birdId", async (req, res) => {
    // Wait for the bird to be edited
    await Bird.findByIdAndUpdate(req.params.birdId, req.body);

    // redirect to the bird's page.
    res.redirect("/birds");    
});

// Set a route to post the filled form for a new bird.
app.post("/birds", async (req, res) => {
    // Wait for the bird to be made.
    await Bird.create(req.body);

    // redirect to the bird directory
    res.redirect(`/birds/${req.params.birdID}`);
});

// Set a route to render a 'directory' page
app.get("/birds", async (req, res) =>{
    //  Gather all birds from the database.
    const allBirds = await Bird.find();
    // Log for the purpose of collecting IDs.
    console.log(allBirds);
    
    // Render the page that shows all the birds.
    res.render("birds/index.ejs", { birds: allBirds });
});

// Listen
app.listen(3000, () => {
    console.log("Listening on port 3000");
});
