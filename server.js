const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser');
require('dotenv/config')
const bodyparser = require('body-parser')
const connect = require("./databse/conn.js");


const userRoute = require ("./api/user/route.js");
const customerDetailsRouter = require('./api/customerDetails/route.js')
const app = express();

// middleware
app.use(express.json());
app.use(cors());
app.use(bodyparser.urlencoded({extended: true}));
app.use(cookieParser());


const PORT = process.env.PORT || 8081;

// HTTP GET request

app.get("/", (req, res) => {
  res.status(201).json("HOME GET");
});
app.get("/hello", (req, res) => {
  res.status(201).json("Hello GET");
});
// api routes
// app.use("/api", router);
app.use("/api", userRoute);
app.use("/api", customerDetailsRouter);



// Start server only when we have valid connection
connect()
  .then(() => {
    try {
      app.listen(PORT, () => {
        console.log(`Server started...${PORT}`);
      });
    } catch (error) {
      console.log("Couldn't connect to the server: ", error);
    }
  })
  .catch((error) => console.log("Invalid connection:"));
