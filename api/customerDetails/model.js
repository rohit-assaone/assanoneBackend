const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const customerDetailsSceham = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    full_name: {
      type: String,
      trim: true,
    },
    mobile: {
      type: Number,
    },
    dateOfBirth: {
      type: String,
    },
    address: {
      type: String,

    },
    pincode: {
      type: Number,
      
    },
    city: {
      type: String,
    },
    state: {
      type: String,

    },
    occupation: {
      type: String,
    },
    martialStatus: {
      type: String,
    },
    sumAssured: {
      type: Number,

    },
    gender: {
      type: String,

    },
    relation: {
      type: String,

    },
  },
  { timestamps: true }
);

const CustomerDetails = new mongoose.model("customerDetails", customerDetailsSceham);

module.exports = CustomerDetails;
