const express = require("express");
const { registerUser, checkMobileNumberExists, getUserDetails, checkMobile, login, logout} = require("./controller.js");


// const accountSid = "AC1732a5e646191ed8d198f493ce6093fd";
// const authToken = "624f507c00886503dadb3e14b7fd38c2";
// const verifySid = "VA8b404a55e03fa227c8db8d470c8f72d1";
// import twilio from 'twilio';
// const client = twilio(accountSid, authToken);
// const messagebird = require('messagebird').initClient('LwhG7uk56uVvrueHU08RMTz1s');

let mobileN;

// import {protect} from "./middleware/authMiddleware.js";
const router = express.Router();

// POST register user route
router.post("/registerUser", registerUser);

// POST login user
router.post("/login", login);

router.post("/logout", logout);

// Send OTP to the provided phone number using MessageBird API
// const generateOTP = () => {
//   return Math.floor(100000 + Math.random() * 900000);
// }
// let otpCache = {};
// router.post('/sendOTP', async (req, res) => {
//   try {
//     const mobile = req.body;
//     const otp = generateOTP();
//     console.log(otp);
//     // Save the OTP in cache for verification later
//     otpCache[mobile] = otp;

//     // Implement the MessageBird API call here to send the OTP via SMS
//     var params = {
//       'originator': 'Assan One',
//       'recipients': [
//         '+919511750947'
//     ],
//       'body': `Your OTP is ${otp}`
//     };
  
//     const responese = await messagebird.messages.create({
//       originator : '+919673390378',
//       recipients : [ '9673390378' ],
//       body : `Your OTP is ${otp}`
//    }, function (err, response) {
//       if (err) {
//         return console.log(err);
//       }
//       console.log(response);
//     });

//     res.status(200).json({ message: 'OTP sent successfully.' });
//   } catch (error) {
//     console.error('Error sending OTP:', error);
//     res.status(500).json({ message: 'Failed to send OTP.' });
//   }
// });



// router.post('/verifyOTP', (req, res) => {
  // // Check if the provided OTP matches the one saved in cache
  // if (otpCache[mobile] && otpCache[mobile] === parseInt(userOTP)) {
  //   // OTP is valid
  //   delete otpCache[phoneNumber]; // Remove the OTP from cache after successful verification
  //   console.log("OTP verified");
  //   res.status(200).json({ message: 'OTP verification successful.' });
  // } else {
  //   // OTP is invalid
  //   res.status(400).json({ message: 'Invalid OTP.' });
  // }
// });
  

  // TWILIO FIRST TRY -------------------------------------
  // // Route to verify OTP and get user details
  // router.post('/verifyOTP', async (req, res) => {
  //   const { mobile , otp } = req.body;

  //   try {
     

  //       const verification_check = await client.verify.services(verifySid).verificationChecks.create({
  //         to: "+919511750947",
  //         code: "407128",
  //       });
                      
  //       console.log(verification_check);
  //     if(verification_check.status === 'approved'){
  //       const userData = await getUserDetails(mobile);

  //       const {user, token} = userData;
  //       console.log(user);
  //       return res.status(200).json({verified: true, userData: userData});
  //     } else {
  //       return res.status(200).json({verified: false})
  //     }
      
    
  //   } catch (error) {
  //     console.log(error);
  //   }
  // });


  //  ----------------------------------------------------------------

// router.post("/checkMobile");
// router.post("/otpsend", accountExists, otp_send);





module.exports = router;