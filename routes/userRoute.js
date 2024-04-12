import express from "express";
import { register } from "../controllers/userController.js";
const router = new express.Router();

router.route("/register").post(register);



export default router;