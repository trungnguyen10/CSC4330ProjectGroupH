const mongoose = require("mongoose");
const ListingSchema = new mongoose.Schema({
<<<<<<< HEAD
    title: { type: String, required: true},
    price: {type: Number, required: true},
    tag: [{type: String}],
    createdAt: {type: Date, default: Date.now(), required: true},
    belongTo: {type: String, required: true}
    // wishlist: []  //String of UserID's that have the item in their wishlist
})
=======
  title: { type: String, required: true },
  price: { type: Number, required: true },
  tag: [{ type: String }],
  createdAt: { type: Date, default: Date.now(), required: true },
  // belongTo: {mongoose.SchemaTypes.ObjectId, required: true}
  // wishlist: []  //String of UserID's that have the item in their wishlist
});
>>>>>>> 8ad36d98c2d765c3dbd9609dbeaf537d3208d05a

ListingSchema.index({ title: "text", tag: "text" });

const model = mongoose.model("ListingModel", ListingSchema);

module.exports = model;
