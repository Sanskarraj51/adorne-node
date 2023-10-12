const authService = require("../service/auth.service");
const authValidate = require("../joi/auth/auth");
class AuthController {
  async loginWithEmail(req, res) {
    try {
      await authValidate(req.body);
      const data = await authService.login(req.body);
      return res
        .status(200)
        .json({ code: true, message: "Login Successfully", data });
    } catch (error) {
      return res
        .status(error.http_code)
        .json({ code: false, message: error.message });
    }
  }

  async register(req, res) {
    try {
      // await authValidate(req.body)
      const data = await authService.register(req.body);
      return res
        .status(200)
        .json({ code: true, message: "Registered Successfully", data });
    } catch (error) {
      return res
        .status(error.http_code)
        .json({ code: false, message: error.message });
    }
  }

  async updateUser(req, res) {
    try {
      const data = await authService.updateUser(req.body);
      return res
        .status(200)
        .json({ code: true, message: "Profile Updated Successfully", data });
    } catch (error) {
      return res
        .status(error.http_code)
        .json({ code: false, message: error.message });
    }
  }
  async updatePassword(req, res) {
    try {
      const data = await authService.updatePassword(req.body);
      return res
        .status(200)
        .json({ code: true, message: "Password Updated Successfully", data });
    } catch (error) {
      return res
        .status(error.http_code)
        .json({ code: false, message: error.message });
    }
  }

  async loginWithMobile(req, res) {
    try {
      const data = await authService.loginWithMobile(req.body);
      return res
        .status(200)
        .json({ code: true, message: "OTP send successfully" });
    } catch (error) {
      return res
        .status(error.http_code)
        .json({ code: false, message: error.message });
    }
  }

  async verifyMobileOtp(req, res) {
    try {
      const data = await authService.verifyMobileOtp(req.body);
      return res
        .status(200)
        .json({ code: true, message: "Login successfully", data });
    } catch (error) {
      return res
        .status(error.http_code)
        .json({ code: false, message: error.message });
    }
  }
}

module.exports = new AuthController();
