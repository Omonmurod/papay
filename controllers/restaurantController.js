const Member = require("../models/Member");
const Product = require("../models/Product");

let restaurantController =
  module.exports; /*bu object modulening ichidagi expertsga teng pastdagi methodlarni yuklash imkonini beradi*/

restaurantController.home = (req, res) => {
  try{
    console.log("GET: cont/home");
    res.render("home-page");
  } catch(err) {
    console.log(`ERROR, cont/home, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

restaurantController.getMyRestaurantProducts = async (req, res) => {
  try {
    console.log("GET: cont/getMyRestaurantProducts");
    //TODO: Get my restaurant products
    const product = new Product();
    const data = await product.getAllProductsDataResto(res.locals.member);
    res.render("restaurant-menu", {restaurant_data: data});
  } catch (err) {
    console.log(`ERROR, cont/getMyRestaurantProducts, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

restaurantController.getSignupMyRestaurant = async (req, res) => {
  try {
    console.log("GET: cont/getSignupMyRestaurant");
    res.render("sign-up"); /* Signup EJS ga boradi */
  } catch (err) {
    console.log(`ERROR, cont/getSignupMyRestaurant, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

restaurantController.signupProcess = async (req, res) => {
  try {
    console.log("POST: cont/sign-up");
    const data = req.body,
      member = new Member() /* 1-member object, 2-service model */,
      new_member = await member.signupData(
        data
      ); /*ichiga req body yuborilyapti*/

    req.session.member =
      new_member; /* req ichiga session ichiga member yaratib uni yangi signedup memberga tenglanyapti */
    // SESSION protsessi quriladi    /* yuqoridagi degani user qayta zapros qilganda browser taniydi */
    res.redirect(
      "/resto/products/menu"
    ); /* bu yangi pageda signupdan keyin new_member datalarini o'qish mumkin bo'ladi */
  } catch (err) {
    console.log(`ERROR, cont/sign-up, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

restaurantController.getLoginMyRestaurant = async (req, res) => {
  try {
    console.log("GET: cont/getLoginMyRestaurant");
    res.render("login-page"); /* Login EJS ga boradi */
  } catch (err) {
    console.log(`ERROR, cont/getLoginMyRestaurant, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

restaurantController.loginProcess = async (req, res) => {
  try {
    console.log("POST: cont/login");
    const data = req.body,
      member = new Member(),
      result = await member.loginData(data); /*ichiga req body yuborilyapti*/

    req.session.member = result;
    /* Login bo'lgan member turiga qarab turli routerlarga boradi */
    req.session.save(function () {
      res.redirect("/resto/products/menu");
    });
  } catch (err) {
    console.log(`ERROR, cont/login, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

restaurantController.logout = (req, res) => {
  console.log("GET cont.logout");
  res.send("You are Logged out");
};

restaurantController.validateAuthRestaurant = (req, res, next) => {
  if (req.session?.member?.mb_type === "RESTAURANT") {
    /* Kelayotgan req ichida mb va mb type =RES bo'lsa*/
    req.member =
      req.session.member; /* Req member qismiga req sess mb yuklanadi */
    next();
  } else
    res.json({
      state: "fail",
      message: "Only authenticated members with restaurant type",
    });
};

restaurantController.checkSessions = (req, res) => {
  if (req.session?.member) {
    res.json({ state: "succeed", data: req.session.member });
  } else {
    res.json({ state: "failed", message: "You are not authenticated" });
  }
};
