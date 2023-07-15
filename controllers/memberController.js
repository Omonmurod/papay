const assert = require("assert");
const Member = require("../models/Member");

let memberController =
  module.exports; /* pastdagi methodlarni yuklash imkonini beradi */
const jwt = require("jsonwebtoken");
const Definer = require("../lib/mistake");

memberController.signup = async (req, res) => {
  /*method */
  try {
    console.log("POST: cont/signup");
    const data = req.body,
      member = new Member() /* 1-member object, 2-service model */,
      new_member = await member.signupData(
        data
      ); /*ichiga req body yuborilyapti*/
      const token = memberController.createToken(rnew_member);
      
      res.cookie('access_token', token, {maxAge: 6*3600*1000, httpOnly: true,});

    res.json({ state: "succeed", data: new_member });
  } catch (err) {
    console.log(`ERROR, cont/signup, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

memberController.login = async (req, res) => {
  try {
    console.log("POST: cont/login");
    const data = req.body,
      member = new Member(),
      result = await member.loginData(data); /*ichiga req body yuborilyapti*/
    const token = memberController.createToken(result);
    console.log("token:::", token);
    res.cookie('access_token', token, {maxAge: 6*3600*1000, httpOnly: true,});

    res.json({ state: "succeed", data: result });
  } catch (err) {
    console.log(`ERROR, cont/login, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

memberController.logout = (req, res) => {
  console.log("GET cont.logout");
  res.send("You are Logged out");
};

memberController.createToken = (result) => {
  try {
    const upload_data = {
      _id: result._id,
      mb_nick: result.mb_nick,
      mb_type: result._mb_type,
    };

    const token = jwt.sign(upload_data, process.env.SECRET_TOKEN, {
      expiresIn: "6h",
    });

    assert.ok(token, Definer.auth_err4);
    return token;
  } catch (err) {
    throw err;
  }
};
