const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete")

const ReviewReportSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"users"
    },
    review_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"reviews"
    },
    admin_id:{
      type: mongoose.Schema.Types.ObjectId,
      ref:"users"
    },
    value: {
      type: String,
      enum: ["accepted", "rejected", "on hold"],
      default:"on hold"
    },
  },
  {
    timestamps: true,
  }
);

ReviewReportSchema.plugin(mongooseDelete, {overrideMethods: "all"})

module.exports = mongoose.model("reviewreports", ReviewReportSchema);
