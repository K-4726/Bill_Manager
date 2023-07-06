const mongoose = require("mongoose");

const transectionSchema = new mongoose.Schema(
  {
    product: {
      type: String,
    },
    quantity: {
      type: Number,
    },
    amount: {
      type: Number,
      required: [true, "amount is required"],
    },
    status: {
      type: String,
      required: [true, "type is required"],
    },
    category: {
      type: String,
      requires: [true, "cat is required"],
    },
    invoice: {
      type: String,
    },
    date: {
      type: Date,
      required: [true, "data is required"],
    },
  },
  { timestamps: true }
);

const transectionModel = mongoose.model("transections", transectionSchema);
module.exports = transectionModel;
