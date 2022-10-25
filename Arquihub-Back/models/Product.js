const mongoose = require("mongoose")
const mongooseDelete = require("mongoose-delete")


const ProductSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Types.ObjectId
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}, {
    timestamps: true

});

ProductSchema.statics.findAllData = function () {
    const joinProduct = this.aggregate([
        {
            $lookup: {
                from: "users",
                localField: "user_id",
                foreignField: "_id",
                as: "user"
            },
        },         
    ]);
    return joinProduct;
};

ProductSchema.plugin(mongooseDelete, {overrideMethods: "all"})

module.exports = mongoose.model("products", ProductSchema)