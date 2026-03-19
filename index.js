
import express from "express";
import mongoose from "mongoose";
import userRouter from "./routers/userRouter.js";
import authenticateUser from "./middlewares/authentication.js";
import productRouter from "./routers/productRouter.js";
import cors from "cors";
import dotenv from "dotenv";


dotenv.config();

const app = express();

const mongodbURI = process.env.MONGO_URI; // access mongodb uri from .env file

// connect mongoose
mongoose.connect(mongodbURI)
.then(
    ()=> {
        console.log("Mongoose Connected...");
    }
).catch(
    err=>{
        console.error(err);
    }
);
 
app.use( cors() );

// collections = database, documents = records
// middleware plugging using use()
app.use( express.json() );


app.use(authenticateUser);


// pluging router
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);




app.listen(3000, ()=>{
    console.log("Sever Start hi...");
});
