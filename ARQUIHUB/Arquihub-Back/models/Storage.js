const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete")

const StorageSchema = new mongoose.Schema(
  {
    url: {
      type: String,
    },
    filename: {
      type: String,
    },
    originalname: {
      type: String
    }
  },
  {
    timestamps: true,
  }
);
StorageSchema.plugin(mongooseDelete, {overrideMethods: "all"})

// StorageSchema.statics.findAllData = function(){
//   const joinStorages = this.aggregate([
//     {
//         $lookup: {
//           from: "updates",
//           localField:"updates_id",
//           foreignField: "_id",
//           as: "updates"
//         }
//     }
//   ])
//   return joinStorages
// }

module.exports = mongoose.model("storages", StorageSchema);
