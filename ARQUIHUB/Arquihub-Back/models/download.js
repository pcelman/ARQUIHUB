const mongoose = require("mongoose")
const mongooseDelete = require("mongoose-delete")


const DownloadSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"users",
        required: true,
    },
    update_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"updates",
    },
    project_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"projects",
        required: true,
    },

}, {
    timestamps: true

});


DownloadSchema.plugin(mongooseDelete, {overrideMethods: "all"})

module.exports = mongoose.model("downloads", DownloadSchema)