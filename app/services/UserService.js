import ProfileModel from "../models/ProfileModel.js";
import UserModel from "../models/UserModel.js";
import { TokenEncode } from "../utility/tokenUtility.js";

export const LoginService = async (req) => {
  try {
    let { email } = req.body;
    let code = Math.floor(100000 + Math.random() * 900000);
    let EmailText = `Your Verification Code is= ${code}`;
    let EmailSubject = "Email Verification";

    //await SendEmail(email,EmailText,EmailSubject)
    await UserModel.updateOne(
      { email: email },
      { $set: { otp: code } },
      { upsert: true }
    );

    return { status: "success", message: "6 Digit Code Send Successfully" };
  } catch (error) {
    return { status: "fail", data: error.toString() };
  }
};

export const VerifyLoginService = async (req) => {
  try {
    let { email, otp } = req.body;

    let total = await UserModel.find({ email: email, otp: otp });
    if (total.length === 1) {
      let user_id = await UserModel.find({ email: email, otp: otp }).select(
        "_id"
      );
      let token = TokenEncode(email, user_id[0]["_id"].toString());
      await UserModel.updateOne({ email: email }, { $set: { otp: "0" } });
      return { status: "success", message: "Valid OTP", token: token };
    } else {
      return { status: "fail", message: "Invalid OTP" };
    }
  } catch (error) {
    return { status: "fail", data: error.toString() };
  }
};

export const CreateUserProfileService = async (req) => {
  try {
    let user_id = req.headers.user_id;
    let reqBody = req.body;
    reqBody.userID = user_id;
    await ProfileModel.updateOne(
      { userID: user_id },
      { $set: reqBody },
      { upsert: true }
    );
    return { status: "success", message: "Profile Save Success" };
  } catch (e) {
    return { status: "fail", message: "Something Went Wrong" };
  }
};

export const UpdateUserProfileService = async (req) => {
  try {
    let user_id = req.headers.user_id;
    let reqBody = req.body;
    reqBody.userID = user_id;
    await ProfileModel.updateOne(
      { userID: user_id },
      { $set: reqBody },
      { upsert: true }
    );
    return { status: "success", message: "Profile Save Success" };
  } catch (e) {
    return { status: "fail", message: "Something Went Wrong" };
  }
};

export const ReadUserProfileService = async (req) => {
  try {
    let user_id = req.headers.user_id;
    let data = await ProfileModel.findOne({ userID: user_id });
    return { status: "success", message: "Profile Read Success", data: data };
  } catch (e) {
    return { status: "fail", message: "Something Went Wrong" };
  }
};
