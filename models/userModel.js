import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    }
});

export const User = new mongoose.model("User", schema);