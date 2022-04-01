const mongoose = require('mongoose');
const ListingSchema = new mongoose.Schema({
    title: { type: String, required: true},
    price: {type: Number, required: true},
    tag: {type: String},
    // owner: {mongoose.SchemaTypes.ObjectId, reuired: true}
    // wishlist: []
})

const model = mongoose.model('ListingModel', ListingSchema)

module.exports = model