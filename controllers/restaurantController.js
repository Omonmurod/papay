const Definer = require("../lib/mistake");
const Member = require("../models/Member");
const Product = require("../models/Product");
const assert = require("assert");
const Resturant = require("../models/Restaurant");

let restaurantController = module.exports;
/*bu object modulening ichidagi expertsga teng pastdagi methodlarni yuklash imkonini beradi*/

restaurantController.home = (req, res) => {
  try {
    console.log("GET: cont/home");
    res.render("home-page");
  } catch (err) {
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
    res.render("restaurant-menu", {
      restaurant_data: data,
    }); /* Product js dan kelgan productlarni resta menu ejs ga qaytaramiz */
  } catch (err) {
    console.log(`ERROR, cont/getMyRestaurantProducts, ${err.message}`);
    res.redirect("/resto");
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
    console.log("POST: cont/signupProcess");
    assert(req.file, Definer.general_err3);
    let new_member = req.body;
    new_member.mb_type = "RESTAURANT";
    new_member.mb_image = req.file.path;

    const member = new Member(); /* 1-member object, 2-service model */
    const result = await member.signupData(new_member);
    assert(result, Definer.general_err1);
    /*ichiga req body yuborilyapti*/

    req.session.member = result;
    /* req ichiga session ichiga member yaratib uni yangi signedup memberga tenglanyapti */
    // SESSION protsessi quriladi    /* yuqoridagi degani user qayta zapros qilganda browser taniydi */
    res.redirect("/resto/products/menu");
    /* bu yangi pageda signupdan keyin new_member datalarini o'qish mumkin bo'ladi */
  } catch (err) {
    console.log(`ERROR, cont/signupProcess, ${err.message}`);
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
    console.log("POST: cont/loginProcess");
    // const data = req.bdy;
    // console.log("data: ", data);
    // res.send("submitted");

    const data = req.body,
      member = new Member() /* Member service model yaratib olinyapti */,
      result = await member.loginData(data); /*ichiga req body yuborilyapti*/
    /*tepadagi result bu object*/
    req.session.member = result;
    /* Session ichida member objectini yaratib resultni yuklayapmiz */
    req.session.save(function () {
      result.mb_type === "ADMIN"
        ? res.redirect(
            "/resto/all-restaurant"
          ) /* Agar req admin bo'lsa all restauga boradi */
        : res.redirect("/resto/products/menu");
    });
  } catch (err) {
    console.log(`ERROR, cont/loginProcess, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

restaurantController.logout = (req, res) => {
  try {
    console.log("GET cont/logout");
    req.session.destroy(function () {
      res.redirect("/resto");
    });
  } catch (err) {
    console.log(`ERROR, cont/logout, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
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

restaurantController.validateAdmin = (req, res, next) => {
  if (req.session?.member?.mb_type === "ADMIN") {
    /* Kelayotgan req ichida mb va mb type =ADMIN bo'lsa*/
    req.member = req.session.member;
    /* Req member qismiga req sess mb yuklanadi */
    next();
  } else {
    const html = `<script>
                    alert("Admin page: Permission denied!");
                    window.location.replace('/resto');
                 </script>`;
    res.end(html);
  }
};

restaurantController.getAllRestaurants = async (req, res) => {
  try {
    console.log("GET cont/getAllRestaurants");

    const restaurant = new Resturant();
    const restaurants_data = await restaurant.getAllRestaurantsData();
    console.log("restaurants_data:", restaurants_data);
    res.render("all-restaurants", { restaurants_data: restaurants_data });
  } catch (err) {
    console.log(`ERROR, cont/getAllRestaurants, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

restaurantController.updateRestaurantByAdmin = async (req, res) => {
  try {
    console.log("POST cont/updateRestaurantByAdmin");
    const restaurant = new Resturant();
    const result = await restaurant.updateRestaurantByAdminData(req.body);
    await res.json({ state: "success", data: result });
  } catch (err) {
    console.log(`ERROR, cont/updateRestaurantByAdmin, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};
