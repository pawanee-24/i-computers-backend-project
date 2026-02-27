import express from "express";
import mongoose from "mongoose";
import userRouter from "./routers/userRouter.js";
import authenticateUser from "./middlewares/authentication.js";
import productRouter from "./routers/productRouter.js";


const app = express();

// cluster URI
const mongodbURI = "mongodb+srv://admin:1234@cluster0.s6mhjd7.mongodb.net/icomputers?appName=Cluster0";


// connect mongoose
mongoose.connect(mongodbURI).then(
    ()=> {
        console.log("Mongoose Connected...");
    }
).catch(
    err=>{
        console.error(err);
    }
);

// collections = database, documents = records
// middleware plugging using use()
app.use( express.json() );


app.use(authenticateUser);


// pluging router
app.use("/user", userRouter);
app.use("/product", productRouter);




app.listen(3000, ()=>{
    console.log("Sever Start hi...");
});
