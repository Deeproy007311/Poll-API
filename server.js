import app from "./App.js";
import { connectDB } from "./config/database.js";

connectDB();


app.listen(process.env.PORT, ()=>{
    console.log(`Server started on port ${process.env.PORT}`);
})