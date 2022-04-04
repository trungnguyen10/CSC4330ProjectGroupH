const express = require("express");
const userRoute = require(`${__dirname}/routes/userRoute`);
const listingRoute = require(`${__dirname}/routes/listingRoute`);
const path = require('path');

const app = new express();

app.use(express.json());
app.use("/api/v1/user", userRoute);
app.use("/api/v1/listing", listingRoute);
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//Setting default landing to login page
app.set('views', path.join(__dirname, 'client'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('login.ejs');
    console.log('Starting the home page');
});

app.get("/signup", (req, res) => {
    res.render("signup.ejs");
    console.log("transferring to signup page");
}).post('/signup', (req, res) => {
    console.log(req.body)
      .then((data) => {
        res.status(201).send(data);
      })
      .catch((err) => {
        res.sendStatus(500);
      });
  });

module.exports = app;
