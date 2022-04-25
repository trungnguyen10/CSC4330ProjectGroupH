const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const AppError = require(`${__dirname}/utils/appError`);
const globalErrorHandler = require(`${__dirname}/controllers/errorController`);
const userRoute = require(`${__dirname}/routes/userRoute`);
const listingRoute = require(`${__dirname}/routes/listingRoute`);
const viewRoute = require(`${__dirname}/routes/viewRoute`);
const wishlistRoute = require(`${__dirname}/routes/wishlistRoute`);

const fs = require("fs");

const app = new express();
app.use(cors());

// set view engine
app.set("view engine", "pug");
app.set("views", `${__dirname}/views`);

// ADDING MIDDLEWARE
// serving static files
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/client`));

// set security HTTP headers
app.use(helmet());

// body parsers
app.use(express.json());
app.use(cookieParser());

// ROUTES
app.use("/", viewRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/listing", listingRoute);
app.use("/api/v1/wishlist", wishlistRoute);

app.all("*", (req, res, next) => {
  console.log(req.originalUrl);
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
