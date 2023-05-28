let memberController = module.exports;

memberController.home = (req, res) => {
  console.log("GET cont.home");
  res.send("You are in Home Page");
};

memberController.signup = (req, res) => {
  console.log("POST cont.signup");
  res.send("You are signedup");
};

memberController.login = (req, res) => {
  console.log("POST cont.login");
  res.send("You are Logged in");
};

memberController.logout = (req, res) => {
  console.log("GET cont.logout");
  res.send("You are Logged out");
};