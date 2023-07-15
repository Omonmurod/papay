const express = require("express");
const router = express.Router(); /* EXPRESS ichidan router olib chiqilyapti */
const memberController = require("./controllers/memberController");

/*****************************
*          REST API          *
*****************************/

// Member routers
router.post("/signup", memberController.signup);
router.post("/login", memberController.login);
router.get("/logout", memberController.logout);
router.get("/check-me", memberController.checkMyAuten);


// Others
router.get("/menu", (req, res) => {
  res.send("Menu Page");
});
router.get("/community", (req, res) => {
  res.send("This is a Community Page");
});

module.exports = router; /* Hosil qilingan routerlarni export qilib olyapmiz */