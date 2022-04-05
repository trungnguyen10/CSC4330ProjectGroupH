const express = require("express");
const helmet = require("helmet");
const userRoute = require(`${__dirname}/routes/userRoute`);
const listingRoute = require(`${__dirname}/routes/listingRoute`);
const fs = require("fs");

const app = new express();

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

// ROUTES
app.get("/", (req, res) => {
  res.status(200).render("base");
});
app.use("/api/v1/user", userRoute);
app.use("/api/v1/listing", listingRoute);

app.get("/", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  fs.readFile("./client/login.html", null, function (error, data) {
    if (error) {
      res.writeHead(404);
      res.write("File not Found");
    } else {
      res.write(data);
      console.log("File found");
    }
    res.end();
  });
  console.log("Starting the home page");
});

app
  .get("/signup", (req, res) => {})
  .post("/signup", (req, res) => {
    console
      .log(req.body)
      .then((data) => {
        res.status(201).send(data);
      })
      .catch((err) => {
        res.sendStatus(500);
      });
  });

module.exports = app;
