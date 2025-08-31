const mongoose = require("mongoose");

const devuserSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  skill: { type: String, required: true },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true },
});

// ✅ EXPORT this model so other files can use it
module.exports = mongoose.model("devuser", devuserSchema);
