const express = require("express");
const userRoute = require(`${__dirname}/routes/userRoute`);
const listingRoute = require(`${__dirname}/routes/listingRoute`);

const app = new express();

app.use(express.json());

app.use("/api/v1/user", userRoute);
app.use("/api/v1/listing", listingRoute);
app.use(express.urlencoded({ extended: true }));

app.post('/signup', (req, res) => {
    console.log(req.body)
      .then((data) => {
        res.status(201).send(data);
      })
      .catch((err) => {
        res.sendStatus(500);
      });
  });

module.exports = app;
