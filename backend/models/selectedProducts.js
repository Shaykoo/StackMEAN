const mongoose = require("mongoose");

const selectedProductSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    image: { type: Array, required: true},
    featuredImage: { type: String, required: true},
    sizes: { type: Array, required: true},
    selectedSize : { type: String, required: true}
   // creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

module.exports = mongoose.model("selectedproduct", selectedProductSchema);