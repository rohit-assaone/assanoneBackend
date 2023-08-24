const CustomerDetails = require("./model.js");

const customerDetailsPost = async (req, res) => {
  try {
    const {
      title,
      full_name,
      mobile,
      dateOfBirth,
      address,
      pincode,
      city,
      state,
      occupation,
      martialStatus,
      sumAssured,
      gender,
      relation,
    } = req.body;

    const newCustomerDetails = new CustomerDetails({
        title,
        full_name,
        mobile,
        dateOfBirth,
        address,
        pincode,
        city,
        state,
        occupation,
        martialStatus,
        sumAssured,
        gender,
        relation,
    });
    const savedCustomerDetails = await newCustomerDetails.save();

    if (!savedCustomerDetails) {
      return res.status(400).json({
        message: "Error saving customer details, Please try again!",
      });
    }

    return res.status(201).json({
      message: "Customer data saved successfully!",
      Customer_details: savedCustomerDetails,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong, Please try again",
      error: error.message,
    });
  }
};

module.exports = customerDetailsPost