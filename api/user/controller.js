const User = require('./model.js');
const bcrypt =  require('bcryptjs');
const jwt = require('jsonwebtoken');

const MESSAGEBIRD_API_KEY = 'LwhG7uk56uVvrueHU08RMTz1s';

// const messagebird = require('messagebird');
// messagebird.initClient('LVAzCI5yU7sZWMXIDvSDSnRCV')
// const accountSid = "AC1732a5e646191ed8d198f493ce6093fd";
// const accountSid = "AC54c8a3a969db673165da2cfb9c68f87b"; // vijayalaxmi
// // const authToken = "624f507c00886503dadb3e14b7fd38c2";
// const authToken = "c995308893809f18b9844019a8b0cb26";  // vijayalaxmi
// const verifySid = "VAde0320371b00ca5e745771b2ff71d22a"; // vijayalaxmi
// import twilio from 'twilio';
// const client = twilio(accountSid, authToken);




// GENERATE JWT
const generateToken = (id, username, email, mobile) => {
  return jwt.sign({id, username, email, mobile}, process.env.JWT_SECRET, {
    expiresIn: '1h'
  })
}


// REGISTER
const registerUser = async (req, res) => {
  try {
    const { username, email, password, mobile } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({email, username, password:hashedPassword, mobile});
    const savedUser = await newUser.save();

    if (!savedUser) {
      return res.status(400).json({
        message: "Error creating user, Please try again!",
      });
    }

    return res.status(201).json({
      message: "User created successfully!",
      user: savedUser
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong, Please try again",
      error: error.message,
    });
  }
};


// LOGIN 
const login = async (req, res) => {
  const {email, password} = req.body;
  console.log("__________________________________-");
  console.log(password);
  try {
    const user = await User.findOne({email});
   
    const hashedPassword = user.password;

    bcrypt.compare(password, hashedPassword, (err, isMatch) => {
      if (err) {
        console.log("Error comparing passwords:", err);
      } else if (isMatch) {

        const token =  generateToken(user._id, user.username, user.email, user.mobile)
        return res.cookie('token', token, { httpOnly: true }).send({ token: token, success: true});
      } else {
        // Passwords don't match, handle invalid login credentials
      }
    });



   
  } catch (error) {
    throw new Error('Error fetching user details');
  }
}


const logout = async (req, res) => {

  try {

    return  res.clearCookie("token").send({ success: true });
   
  } catch (error) {
    throw new Error('Error fetching user details');
  }
}

// ACCOUNT EXISTS CHECK
const checkMobileNumberExists = async (mobile) => {
  try {
    const user = await User.findOne({mobile});
    return user ? true : false;
  } catch (error) {
    throw new Error('Error checking mobile number existence');
  }
};
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





const getUserDetails = async (mobile) => {
  console.log(mobile);
  try {
    const user = await User.findOne({mobile});

    console.log(user);
    return { 
        user: user,
        token: generateToken(user._id) 
      };
  } catch (error) {
    throw new Error('Error fetching user details');
  }
};


// Check Mobile
const checkMobile = async(req, response) => {
  const { mobile } = req.body;

  try {
    const exists = await checkMobileNumberExists(mobile);
    if(exists) {
      // client.verify.v2
      // .services(verifySid)
      // .verifications.create({ to: "+919511750947", channel: "sms" })
      // return response.status(200).json({otp_status:true});
    }
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}





module.exports = {registerUser,login, logout, checkMobileNumberExists, getUserDetails, checkMobile}

