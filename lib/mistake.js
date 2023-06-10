class Definer {
  /* General Errors */
  static general_err1 = "Att: Something went wrong!";
  static general_err2 = "Att: There is no data with that params!";
  static general_err3 = "Att: File uplad error!";

  /* Member auth related errors */
  static auth_err1 = "Att: MongoDB validation is failed!";
  static auth_err2 = "Att: No member with that mb_nick!";
  static auth_err3 = "Att: Your credentials do not match!";

  /* Product related errors */
  static product_err1 = "Att: Product creation is failed!";
}

module.exports = Definer;