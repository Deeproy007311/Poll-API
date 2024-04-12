import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import errorHandler from "../utils/ErrorHandler.js";
import { Question } from "../models/questionModel.js";
import { Option } from "../models/optionModel.js";
import { User } from "../models/userModel.js";

// Add options to a sepcific question logic
export const addOption = catchAsyncError(async (req, res, next) => {
  // finding a particular question
  const question = await Question.findById(req.params.id);
  console.log(req.body.text, req.params.id);

  // creating options
  const currOption = await Option.create({
    text: req.body.text,
  });
  // i will create dynamic vote link later
  currOption.save();
  // pushing options id into question
  question.options.push(currOption.id);
  question.save();

  return res.status(200).json({
    message: "Option added succesfully",
    data: currOption,
  });
});

export const incrementVotes = catchAsyncError(async (req, res, next) => {
  // Finding the authenticated user
  const user = await User.findById(req.user._id);
  
  // Fetching username from the authenticated user's details
  const username = user.name;

  // Finding the particular option
  const option = await Option.findById(req.params.id);

  // Incrementing vote count and saving username
  option.votes += 1;
  option.username = username;
  
  await option.save();
  
  return res.status(200).json({
    message: "Vote added",
    votes: option.votes,
  });
});

