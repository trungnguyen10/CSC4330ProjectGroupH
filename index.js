const express = require("express");
const userRoute = require(`${__dirname}/routes/userRoute`);
const listingRoute = require(`${__dirname}/routes/listingRoute`);

const app = new express();

app.use(express.json());

app.use("/api/v1/user", userRoute);
app.use("/api/v1/listing", listingRoute);

module.exports = app;
