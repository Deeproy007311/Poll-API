// importing mongoose
import mongoose from "mongoose";

const schema = new mongoose.Schema({
    text:{
        type: String,
        required: true,
    },
    votes:{
        type: Number,
        required: true,
        default: 0,
    },
    username:{
        type: String,
    },
    link_to_vote:{
        type: String,
        required: false,
        default: "",
    },
});

export const Option = new mongoose.model("Option", schema);