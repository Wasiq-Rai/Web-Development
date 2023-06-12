//
module.exports = function (req, res, next) {
  let roles = req.session.user.role;
  console.log("Role: "+roles);
  // let admin = roles.find((r) => r == "admin");
  if (roles) next();
  else {
    req.setFlash("danger", "You need to be an admin to access this resource");
    res.redirect("back");
  }
};
