import User from "../model.js";
import jwt from "jsonwebtoken";
import asyncHandler from 'express-async-handler'




// Initialize Twilio client
const client = twilio(accountSid, authToken);


const protect = asyncHandler(async (req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{    
            // Get token from header
            token = req.headers.authorization.split(' ')[1];
            
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from the token
            req.user = await User.findById(decoded.id).select('-password');

            next();
        }catch(error){
            console.log(error);
            res.status(401);
            throw new Error('Not Authorized')
        }   
    } 

    if(!token) {
        res.status(401);
        throw  new Error('Not authorized, no token')
    }
    }    
)



// ACCOUNT EXISTS CHECK
export const accountExists = async (req, res) => {
    const {mobile} = req.body;
    try {
        const user = await User.findOne({ mobile });
        return user ? true : false;
      } catch (error) {
        throw new Error('Error checking mobile number existence');
      }
    // console.log(userE);
    // if (!userE) {
    //   return res.status(400).json({
    //     message: "Error finding user, Create New Account!",
    //   });
    // }else {
    //     res.status(201).json({
    //         message: "User Exists!",
    //         user: userE,
    //         token: generateToken(userE._id)
    //       });;
    //       next();
          
    // }
}




export default protect;