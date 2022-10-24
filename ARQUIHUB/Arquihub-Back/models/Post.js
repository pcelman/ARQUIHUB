const mongoose = require("mongoose")
const mongooseDelete = require("mongoose-delete")

const PostSchema = new mongoose.Schema({
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
    created_by: {
        type: mongoose.Types.ObjectId,
    },
    project_id:{
        type: mongoose.Types.ObjectId,
    },
    project_type: {
        type: String,
    },
    mts2: {
        type: Number
    },
    image: [{
        type: String,
        // default: "https://res.cloudinary.com/dfcd64nhm/image/upload/v1664674482/Arquihub/4e36ead625b16bac653d2b07c7a57005_if3usp.png"
    },
],
    rooms: {
        type: Number
    },
    year: {
        type: String
    },
    bathrooms: {
        type: Number
    },
    authors:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }],
    additional_data: [{
        type: String
    }],
    rating: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})

PostSchema.statics.findAllData= function (){
    const joinReviews = this.aggregate([
        {
            $lookup:{
                from: "reviews",
                localField:"_id",
                foreignField:"postId",
                as:"reviews"
            }
        },
    ])
    return joinReviews 
};

PostSchema.plugin(mongooseDelete, {overrideMethods: "all"})

module.exports = mongoose.model("posts", PostSchema)
