const mongoose = require("mongoose");
const attendene = mongoose.Schema;
const attendeneSchema = new attendene({
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
});

module.exports = mongoose.model("Attandenceuser", attendeneSchema)
