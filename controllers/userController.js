import { User } from "../models/userModel.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import errorHandler from "../utils/ErrorHandler.js";

export const register = catchAsyncError(async (req, res, next) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return next(new errorHandler("Plase add all fields", 400));
  }
  const userExist = await User.findOne({ email: email });
  if (userExist) {
    return next(new errorHandler("user is alraedy exist", 409));
  }
  const userCreate = await User.create({
    name,
    email,
  });
  console.log(userCreate);
  res.status(201).json({
    message: "Registered succesfully",
    data: userCreate,
  });
});
