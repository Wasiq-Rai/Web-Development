const express = require("express");
const bcrypt = require("bcryptjs");
let router = express.Router();
let User = require("../models/Driver");
router.get("/", (req, res) => {

  res.render("homepage");
});

router.get("/homepage", (req, res) => {
  res.render("homepage");
});




module.exports = router;
