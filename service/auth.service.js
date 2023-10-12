const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { UserEntity } = require("../models/index");
const { HttpException } = require("../exception/http.exception");
const { ENTITY_TYPE, ENTITY_STATUS } = require("../helper/constant");
const { Op } = require("sequelize");
const saltRounds = 12;

class AdminService {
  async login(payload) {
    try {
      const { email, password } = payload;
      const userInfo = await UserEntity.findOne({
        where: { email: email },
        raw: true,
      });
      if (!userInfo) throw new HttpException(422, "User Does not Exists");

      if (password !== userInfo.password)
        throw new HttpException(422, "Wrong Password");

      // if(!bcrypt.compareSync(password, userInfo.password)) throw new HttpException(422, 'Wrong Password' )

      const token = jwt.sign({ ...userInfo }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });
      delete userInfo.password;
      return { ...userInfo, token };
    } catch (error) {
      throw new HttpException(error.http_code, error.message);
    }
  }

  async register(payload) {
    try {
      const { email, password, name, mobile } = payload;
      const userInfo = await UserEntity.findOne({
        where: { email: email },
        raw: true,
      });
      if (userInfo) throw new HttpException(422, "User Already Exists");
      //   let hash = "";
      //   bcrypt.hash(password, saltRounds, function (err, hash) {
      //     // Store hash in database here
      //     hash = hash;
      //   });
      await UserEntity.create({
        mobile,
        role: ENTITY_TYPE.USER,
        status: ENTITY_STATUS.ACTIVE,
        name: name,
        email: email,
        password: password,
      });

      let user = await UserEntity.findOne({
        where: { email, role: ENTITY_TYPE.USER },
        raw: true,
      });

      const token = jwt.sign({ ...user }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });
      delete user.password;
      return { ...user, token };
    } catch (error) {
      throw new HttpException(error.http_code, error.message);
    }
  }

  async updateUser(payload) {
    try {
      const { name, mobile, user_id } = payload;
      const userInfo = await UserEntity.findOne({
        where: { id: { [Op.ne]: user_id } },
        raw: true,
      });
      if (!userInfo)
        throw new HttpException(422, "No User Exists with this Email");

      await UserEntity.update({ name, mobile }, { where: { id: user_id } });

      let user = await UserEntity.findOne({
        where: { id: user_id },
        raw: true,
      });
      delete user.password;
      return user;
    } catch (error) {
      throw new HttpException(error.http_code, error.message);
    }
  }

  async updatePassword(payload) {
    try {
      const { oldPassword, password, user_id } = payload;
      const userInfo = await UserEntity.findOne({
        where: { id: user_id },
        raw: true,
      });
      if (!userInfo)
        throw new HttpException(422, "No User Exists with this Email");

      console.log("-----userInfo", userInfo, "---------", user_id);

      if (oldPassword !== userInfo.password)
        throw new HttpException(422, "Invalid Old Password");

      return await UserEntity.update({ password }, { where: { id: user_id } });
    } catch (error) {
      throw new HttpException(error.http_code, error.message);
    }
  }

  async loginWithMobile(payload) {
    try {
      const { mobile } = payload;
      //const userInfo = await UserEntity.findOne({where: {mobile , role : ENTITY_TYPE.USER},raw: true});
      return true;
      // if(!userInfo)  throw new HttpException(422, 'Invalid Credentials' )

      // if(!bcrypt.compareSync(password, userInfo.password)) throw new HttpException(422, 'Wrong Password' )

      // const token = jwt.sign({...userInfo }, process.env.JWT_SECRET , { expiresIn: '1h' });
      // delete userInfo.password
      // return { ...userInfo , token}
    } catch (error) {
      throw new HttpException(error.http_code, error.message);
    }
  }

  async verifyMobileOtp(payload) {
    try {
      const { mobile, otp } = payload;
      if (otp != "123456") throw new HttpException(422, "Invalid Otp");

      let userInfo = await UserEntity.findOne({
        where: { mobile, role: ENTITY_TYPE.USER },
        raw: true,
      });

      if (!userInfo) {
        await UserEntity.create({
          mobile,
          role: ENTITY_TYPE.USER,
          status: ENTITY_STATUS.ACTIVE,
          name: "customer",
        });
      }

      userInfo = await UserEntity.findOne({
        where: { mobile, role: ENTITY_TYPE.USER },
        raw: true,
      });

      const token = jwt.sign({ ...userInfo }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });
      delete userInfo.password;
      return { ...userInfo, token };
    } catch (error) {
      console.log(error);
      throw new HttpException(error.http_code, error.message);
    }
  }
}

module.exports = new AdminService();
