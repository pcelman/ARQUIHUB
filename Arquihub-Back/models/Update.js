const mongoose = require("mongoose")
const mongooseDelete = require("mongoose-delete")


const UpdateSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"users",
    },
    project_id: {
        type: mongoose.Types.ObjectId,
    },
    storage_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"storages"
    },
    title: {
        type: String
    },
    comments: {
        type: String
    }
}, {
    timestamps: true

});

UpdateSchema.statics.findAllData = function () {
    const joinUpdate = this.aggregate([
        {
            $lookup: {
                from: "users",
                localField: "user_id",
                foreignField: "_id",
                as: "user"
            },
        },
        {
            $lookup: {
                from: "projects",
                localField: "project_id",
                foreignField: "_id",
                as: "project"
            },
        },
        {
            $lookup: {
                from: "storages",
                localField: "storage_id",
                foreignField: "_id",
                as: "storage"
            },
        },
    ]);
    return joinUpdate;
};

UpdateSchema.plugin(mongooseDelete, {overrideMethods: "all"})

module.exports = mongoose.model("updates", UpdateSchema)