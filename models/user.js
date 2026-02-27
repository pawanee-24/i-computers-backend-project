import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email : {
            type : String,
            required : true,
            unique : true // unique true aken krnne => identify it is primary key
        },

        firstName : {
            type : String,
            required : true,
        },

        lastName : {
            type : String,
            required : true,
        },

        password : {
            type : String,
            required : true,
        },

        isAdmin : {
            type : Boolean,
            required : true,
            default : false,
        },

        isBlocked : {
            type : Boolean,
            required : true,
            default : false,
        },

        isEmailVerified : {
            type : Boolean,
            required : true,
            default : false,
        },

        image : {
            type : String,
            default : "/images/default-Profiler.png",
        }
    }
);


const User = mongoose.model("user", userSchema);

export default User;