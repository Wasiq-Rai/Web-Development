const express = require("express");
const bcrypt = require("bcryptjs");
let router = express.Router();
let User = require("../models/User");
let Event = require("../models/Events");
let Admin = require("../models/Admin");
let sessionAuth = require("../middlewares/sessionAuth");
let admin = require("../middlewares/admin");
let Review = require("../models/Review");

router.get("/", (req, res) => {
  res.render("entry", {layout: false});
});
router.get("/login", (req, res) => {
  res.render("login");
});
router.get("/logout", (req, res) => {
  req.session.user = null;
  req.setFlash("danger", "Logged out!");
  // req.session.flash = { type: "success", message: "Logged Out Successfully!" };
  res.redirect("/login");
});
router.post("/login", async (req, res) => {
  let user;
  console.log(req.body);
  if(req.body.role == "client"){
   user = await User.findOne({ email: req.body.username });
  }
  else{
     user = await Admin.findOne({ email: req.body.username });
  }
  if (!user) {
    req.setFlash("danger", "User with this email not present");
    return res.redirect("/login");
  }
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (validPassword) {
    req.session.user = user;
    req.setFlash("success", "Logged in Successfully");
    console.log("Response: "+user);

    if(user.role == 'admin') {
      return res.redirect("/admin-profile");
    }
    else
    return res.redirect("/homepage");
  } else {
    req.setFlash("danger", "Invalid Password");
    return res.redirect("/login");
  }
});
router.get("/register", (req, res) => {
  res.render("register");
});
router.get("/homepage",async (req, res) => {
  let reviews = await Review.find();
  res.render("homepage",{reviews: reviews});
});
router.get("/profile", async (req, res) => {
  //this route should be protected
  res.render("profile");
});
router.post("/register", async (req, res) => {
  let userObj = req.body;
  req.session.user = userObj;
  if( await User.findOne({ email: req.body.email }))
  {
    req.setFlash("danger", "User already registered");
    return res.redirect("/register");
  }



  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(userObj.password, salt);
  userObj.password = hashed;
  let user = new User(userObj);
  await user.save();
  return res.render("profile");
});
router.get('/events', async (req, res) => {
  try {
    const events = await Event.find();
    res.render('events', { events });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.get("/admin-profile", sessionAuth, admin, async (req, res, next) => {
  //this route should be protected
  const events = await Event.find().sort({ date: 1 }).limit(3);
  const allEvents = await Event.find();

    // Render the data in your HTML template
  res.render('admin-profile', { events ,allEvents });
  // next();
});



// Handle POST request to save the review
router.post("/save-review", (req, res) => {
  const { content, author, rating } = req.body;
  console.log(req.body)
  // Create a new review instance
  const newReview = new Review({
    content,
    author,
    rating
  });

  // Save the review to the database
  newReview.save()
    .then(() => {
      req.setFlash('success',"Review saved successfully")
      console.log("Updated review");
      res.redirect("/homepage"); // Review saved successfully
    })
    .catch(error => {
      console.error("Failed to save review:", error);
      res.sendStatus(500); // Error occurred while saving the review
    });
});


module.exports = router;
