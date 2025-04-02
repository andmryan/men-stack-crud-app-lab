// Configuration of Server
const dotenv = require("dotenv");
dotenv.config();

// Required Packages
const express = require("express");
const mongoose = require("mongoose");

// App Initialization
const app = express();
app.use(express.urlencoded({ extended: false }));

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

// Set a route to post the filled form for a new bird
app.post("/birds", async (req, res) => {
    // Wait for the bird to be made.
    await Bird.create(req.body);
    // redirect to the form to add a new bird.
    res.redirect("/birds");
});

app.get("/birds", async (req, res) =>{
    //  Gather all birds from the database.
    const allBirds = await Bird.find();
    
    // Render the page that shows all the birds.
    res.render("birds/index.ejs", { birds: allBirds });
});

// Listen
app.listen(3000, () => {
    console.log("Listening on port 3000");
});
