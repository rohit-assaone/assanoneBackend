const mongoose = require("mongoose");
require('dotenv/config');
const { MongoMemoryServer } = require("mongodb-memory-server");

const connect = async () => {
   mongoose.connect(process.env.MONGO_URI,  {

    useNewUrlParser: "true",
    useUnifiedTopology: "true"
  
  })
   .then(console.log("MongoDB connected..."))
   .catch((err) => console.log(err))
}


module.exports = connect;