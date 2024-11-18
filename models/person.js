const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;

console.log("connecting to", url);
mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
    validate: {
      validator: function (value) {
        return /^[\p{L}\s]+$/u.test(value); // Allow Unicode letters and spaces
      },
      message: (props) => `${props.value} is not a valid name!`,
    },
  },
  number: {
    type: String,
    minlength: 8,
    required: true,
    validate: {
      validator: function (value) {
        // Regex checks for 2-3 digits, a hyphen, and then at least 5 digits
        return /^\d{2,3}-\d{5,}$/.test(value);
      },
      message: (props) =>
        `${props.value} is not a valid phone number! It should be in the format XX-YYYYYY or XXX-YYYYYY.`,
    },
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
