const Member = require("../models/Member");

let restaurantController = module.exports; /*pastdagi methodlarni yuklash imkonini beradi*/

restaurantController.getSignupMyRestaurant = async (req, res) => {
  try {
    console.log('GET: cont/getSignupMyRestaurant');
    res.render('signup'); /* Signup EJS ga boradi */
  } catch(err) {
    console.log(`ERROR, cont/getSignupMyRestaurant, ${err.message}`);
    res.json({state: 'fail', message: err.message});
  }
};

restaurantController.signupProcess = async (req, res) => {
  try {
    console.log('POST: cont/signup');
    const data = req.body,
      member = new Member(),  /* 1-member object, 2-service model */
      new_member = await member.signupData(data); /*ichiga req body yuborilyapti*/

    // SESSION protsessi quriladi

    res.json({state: 'succeed', data: new_member});
  } catch(err) {
    console.log(`ERROR, cont/signup, ${err.message}`);
    res.json({state: 'fail', message: err.message});
  }
};

restaurantController.getLoginMyRestaurant = async (req, res) => {
  try {
    console.log('GET: cont/getLoginMyRestaurant');
    res.render('login-page'); /* Login EJS ga boradi */
  } catch(err) {
    console.log(`ERROR, cont/getLoginMyRestaurant, ${err.message}`);
    res.json({state: 'fail', message: err.message});
  }
};

restaurantController.loginProcess = async (req, res) => {
  try {
    console.log('POST: cont/login');
    const data = req.body,
      member = new Member(),
      result = await member.loginData(data); /*ichiga req body yuborilyapti*/

    res.json({state: 'succeed', data: result});
  } catch(err) {
    console.log(`ERROR, cont/login, ${err.message}`);
    res.json({state: 'fail', message: err.message});
  }
};

restaurantController.logout = (req, res) => {
  console.log("GET cont.logout");
  res.send("You are Logged out");
};