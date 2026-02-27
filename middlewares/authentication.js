import jwt from "jsonwebtoken";
 
 export default function authenticateUser(req, res, next){

        const header = req.header("Authorization");

        if(header != null){
            const token = header.replace("Bearer ", "");
            // console.log(token);

            jwt.verify(token, "I-Computers10Batch",
                (error, decoded)=>{
                    
                    if(decoded == null){
                        res.json({
                            message: "invalid token please login again"
                        });
                    } else {
                        req.user = decoded;
                        next();
                    }
                    
                }
            )


        } else {
            next();
        }
        

    }