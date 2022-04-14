const mongoose = require("mongoose");
const ListingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  tag: [{ type: String }],
  createdAt: { type: Date, default: Date.now(), required: true },
  // belongTo: {mongoose.SchemaTypes.ObjectId, required: true}
  // wishlist: []  //String of UserID's that have the item in their wishlist
});

ListingSchema.index({ title: "text", tag: "text" });

const model = mongoose.model("ListingModel", ListingSchema);

module.exports = model;
