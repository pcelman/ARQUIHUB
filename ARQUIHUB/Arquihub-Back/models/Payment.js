const mongoose = require("mongoose")
const mongooseDelete = require("mongoose-delete")


const PaymentSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Types.ObjectId,
    },
    idCustomerStripe:{
        type: String,
        default:""
    },
    idSubscriptionStripe:{
        type: String,
        default:""
    },
    active:{
        type: Boolean,
        default : true
    }
}, {
    timestamps: true
})

PaymentSchema.plugin(mongooseDelete, {overrideMethods: "all"})

module.exports = mongoose.model("payments", PaymentSchema)