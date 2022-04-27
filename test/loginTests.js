// submit these items under the terminal:
// Npm install mocha
// Npm install chai
// Make sure that mocha, chai, and jest are part of dependencies and other sets in the package.json and package-lock.json
// Next, you would have to put “test”: ”mocha” under the “scripts” section of the .json files
// Create a test java file within the coding program
// Set up the code so that it could be read through chai and mocha in node
// Such as bringing in should, expect, and assert as a constant for chai; and describe, it, and other terms that deal with testing for mocha
// Now, put “npm test” or “npm run test” in the terminal
// There the user will see if their test(s) is/are passing or failed
// Following that, the user can either add more tests or fix those that failed

const assert = require('chai').assert;
const logIn = require('../test/loginPractice').logIn;

describe('Login', function() {
    it('login should allow you to fill in your created email and password', function() {
        let result = logIn();
        assert.equal(result, 'email, password');
    });

    it('login should return type string', function () {
        let result = logIn();
        assert.typeOf(result, 'string');
    });

    it('login should notify the user when email and/or password are wrong', function () {
        const error = 'Email or password is invalid. Please try again';
        assert.equal(error, 'Email or password is invalid. Please try again');
    });

    it('The button at the bottom of the login page should bring the user to the signup', function () {
        const signupHere = "./signup.html";
        assert.equal(signupHere, "./signup.html");
    });
});

// > csc4330projectgrouph@1.0.0 test
// > mocha
// Login
// ✔ login should allow you to fill in your created email and password
// ✔ login should return type string
// ✔ login should notify the user when email and/or password are wrong
// ✔ The button at the bottom of the login page should bring the user to the signup
// 4 passing (31ms)
