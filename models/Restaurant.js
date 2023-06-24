const assert = require("assert");
const Definer = require("../lib/mistake");
const MemberModel = require("../schema/member.model");

class Resturant {
  constructor() {
    this.memberModel = MemberModel; //Membermodel mongodb ning classi
  }

  async getAllRestaurantsData() {
    try {
      const result = await this.memberModel
        .find({
          mb_type: "RESTAURANT",
        })
        .exec();
      
      assert(result, Definer.general_err1);
      return result;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Resturant;