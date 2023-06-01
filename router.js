const express = require("express");
const router = express.Router();
const memberController = require("./controllers/memberController");

// Member routers
router.post("/signup", memberController.signup);
router.post("/login", memberController.login);
router.get("/logout", memberController.logout);


// Others
router.get("/menu", (req, res) => {
  res.send("Menu Page");
});
router.get("/community", (req, res) => {
  res.send("This is a Community Page");
});

module.exports = router;