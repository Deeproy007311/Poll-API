import express from "express";

import { config } from "dotenv";
import allroutes from "./routes/allRoutes.js";
import userRoute from "./routes/userRoute.js";
import cookieParser from "cookie-parser";

config({
    path: "./config/config.env",
});

const app = express();
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(cookieParser());

// Implementing routes
app.use("/api", allroutes);
app.use("/api", userRoute);

export default app;