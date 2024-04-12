// Importing mongoose
import mongoose from "mongoose";

// importing option model
import { Option } from "./optionModel.js";


const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    options: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Option",
        },
    ],
});

export const Question = new mongoose.model("Question", schema);