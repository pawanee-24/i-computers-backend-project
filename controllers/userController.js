import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export async function createUser(req, res){

    try {

        const passwordHash = bcrypt.hashSync(req.body.password, 10);

        const newUser = new User({
            email : req.body.email,
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            password : passwordHash
        });

        await newUser.save();

        res.json({
            massage : "user create successfully"
        });

    } catch (error) {
        res.json({
            massage : "error creating user"
        });
    }
    

}


export async function loginUser(req, res){
    
    try {
        
        const user = await User.findOne({
            email : req.body.email
        })

        console.log(user);

        if(user == null){
            res.status(404).json({
                massage : "user not found"
            });

        } else {

            const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);

            if (isPasswordCorrect) {

                const payLoad = {
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    isAdmin: user.isAdmin,
                    isBlocked: user.isBlocked,
                    isEmailVerified: user.isEmailVerified,
                    image: user.image
                }


                const token = jwt.sign(payLoad, "I-Computers10Batch", {
                    // 48 hours => token expires time
                    expiresIn : "48h"
                });

                res.json({
                    token: token
                });
                

            } else {
                res.status(401).json({
                    massage : "invalid password"
                });
            }
        }

    } catch (error) {
        res.status(500).json({
            massage : "invalid loging in"
        });
    }

}


export function isAdmin(req){
    
    if(req.user == null){
        return false;
    }

    if(req.user.isAdmin){
        return true;
    }else{
        return false;
    }

}
