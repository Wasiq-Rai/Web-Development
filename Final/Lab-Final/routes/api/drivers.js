const express = require("express");
const Driver = require("../../models/Driver");
let router = express.Router();
// router.post("/api/drivers", async function (req, res) {
//   let record = new Driver(req.body);
//   await record.save();
//   res.send(record);
// });

router.get("/add-new",async  (req, res) => {
  return res.render("addNewDriver");
});
router.post("/add-new", async (req, res) => {
  try {
    const { name, salary , vehicle } = req.body;
    const driver = new Driver({ name, salary , vehicle });
    await driver.save();
    console.log(req.body);
    return res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.put("/api/driver/:id", async function (req, res) {
  //   return res.send(req.body);
  let record = await Driver.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.send(record);
});
router.post("/delete/:id", async function (req, res) {
  let record = await Driver.findByIdAndDelete(req.params.id);
  res.redirect("/");
});
router.get("/delete/:id", async function (req, res) {
  let record = await Driver.findByIdAndDelete(req.params.id);
  res.redirect("/");
});
router.get("/homepage", async function (req, res) {
  res.render("homepage")
});
router.get("/", async function (req, res) {
  let records = await Driver.find();
  console.log(  records);
  res.render("homepage", { records });
});

module.exports = router;
