process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let signup = require('../client/js/signup.js');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);
//Our parent block
const isInteger = require("./isInteger");

describe("isInteger", () => {
    const integerNumbers = [-10, -1, 0, 1, 10];

    test.each(integerNumbers)(
        "passes for integer value %j",
        (fixture) => expect(isInteger(fixture)).toBe(true)
    );

    const floatNumbers = [-10.1, -1.1, 0.1, 1.1, 10.1];

    test.each(floatNumbers)(
        "fails for non-integer value %j",
        (fixture) => expect(isInteger(fixture)).toBe(false)
    );
});