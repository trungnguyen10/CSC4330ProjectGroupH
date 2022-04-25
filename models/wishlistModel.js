const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  listing_id: { type: String, required: true },
});

wishlistSchema.index({ user_id: 1, listing_id: 1 }, { unique: true });

const model = mongoose.model("Wishlist", wishlistSchema);

module.exports = model;
