import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import errorHandler from "../utils/ErrorHandler.js";
import { Question } from "../models/questionModel.js";
import { Option } from "../models/optionModel.js";

// Create Question Logic
export const createQuestion = catchAsyncError(async (req, res, next) => {
  // Creating the question
  const question = await Question.create(req.body);

  // Returning the response
  return res.status(200).json({
    message: "Question created successfully",
    data: question,
  });
});

// Delete a question logic
export const deleteQuestion = catchAsyncError(async (req, res, next) => {
  // finding the particular question
  const question = await Question.findById(req.params.id);

  // if question is not found retuen an error
  if (!question) {
    return next(new errorHandler("Question not found", 404));
  }

  // deleting all options related to the question
  for (let optionId of question.options) {
    let option = await Option.findById(optionId);
    // checking weather option contains any votes or not
    if (option.votes > 0) {
      return next(
        new errorHandler(
          "You can't delete that option as it has some votes",
          403
        )
      );
    }
    // delete that particular option
    await option.findByIdAndDelete(optionId);
  }
  // deleting the question
  await Question.findByIdAndDelete(req.params.id);
  return res.status(200).json({
    message: "Question deleted successfully",
  });
});

// view question and option logic
export const getQuestionDetails = catchAsyncError(async(req, res, next)=>{
  // finding and populating the question
  const question = await Question.findById(req.params.id).populate(
    "options"
  );
  return res.status(200).json(question)
});
