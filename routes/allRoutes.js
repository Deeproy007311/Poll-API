import express from "express";
import { createQuestion, deleteQuestion, getQuestionDetails } from "../controllers/questionController.js";
import { addOption, incrementVotes } from "../controllers/optionController.js";
const router = new express.Router();

// To create a question
router.route("/questions/create").post(createQuestion);

// To delete a question
router.route("/questions/delete/:id").delete(deleteQuestion);

// To get a question details
router.route("/questions/:id").get(getQuestionDetails);

// adding route for creating option
router.route("/questions/:id/options/create").post(addOption);

// Adding route for incrementing the vote
router.route("/options/:id/add_vote").get(incrementVotes);

export default router;