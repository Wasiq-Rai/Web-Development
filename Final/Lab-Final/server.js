const express = require("express");
let app = express();
var expressLayouts = require("express-ejs-layouts");
app.set("view engine", "ejs");
app.use(express.static("public"));
var cookieParser = require("cookie-parser");
var session = require("express-session");
app.use((req, res, next) => {
  // res.send("site is down for maintenance");
  console.log(req.url);
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressLayouts);
app.use(cookieParser());
app.use(
  session({
    secret: "My Top Secret String",
    cookie: { maxAge: 60000 },
    resave: true,
    saveUninitialized: true,
  })
);
app.use("/", require("./routes/api/drivers"));


app.use((req, res, next) => {
  res.status(404).send("Not Found");
});

app.listen(4000, () => {
  console.log("Server Started");
});
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/Web-Lab-Final", { useNewUrlParser: true })
  .then(() => console.log("Connected to Mongo ...."))
  .catch((error) => console.log(error.message));
