const mongoose = require("mongoose");
const  leave= mongoose.Schema;
const leaveSchema = new  leave({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    unique: true,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  message:{
    type:String,
    required:true,

  }
});

module.exports = mongoose.model("Leaveuser", leaveSchema);