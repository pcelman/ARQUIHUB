const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete")

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    visibility: {
      type: String,
        enum: ["private", "public"],
        default: "public"
    },
    pdf_file: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"storages"
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    users:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }],
    project_file:{
      type: mongoose.Schema.Types.ObjectId,
      ref:"storages"
    },
}, {
    timestamps: true
})

ProjectSchema.statics.findAllData = function () {
    const joinReviews = this.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "created_by",
          foreignField: "_id",
          as: "created_by_data",
        },
      },
    ]);
    return joinReviews;
  };

ProjectSchema.plugin(mongooseDelete, {overrideMethods: "all"})
module.exports = mongoose.model("projects", ProjectSchema)
