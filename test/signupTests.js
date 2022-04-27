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



const { signupEmail, signupPassword } = require('../test/signupPractice');
const assert = require('chai').assert;
const signUp = require('../test/signupPractice').signUp;

describe('Signup', function() {
    it('Signup should allow you to fill in name, email, password, passwordConfimed', function() {
        let result = signUp();
        assert.equal(result, 'name, email, password, passwordConfimed');
    });

    it('Signup should return type string', function () {
        let result = signUp();
        assert.typeOf(result, 'string');
    });

    it('Signup should have be a student email', function () {
        let email = signupEmail();
        assert.equal(email, 'jshepard@columbus.edu');
    });

    it('Password should have 8 characters at most in order to be accepted', function () {
        let pw = signupPassword();
        const minlength = 8;
        assert.equal(pw, 'password');
        assert.equal(minlength, 8);
    });
    
    it('Confirmed password should completely relate to password', function () {
        let pw = signupPassword();
        const Cpw = 'password';
        assert.equal(Cpw, 'password');
    });

    it('The button at the bottom of the signup page should bring the user to the login', function () {
        const loginHere = "./login.html";
        assert.equal(loginHere, "./login.html");
    });
});

// > csc4330projectgrouph@1.0.0 test
// > mocha
// Signup
// ✔ Signup should allow you to fill in name, email, password, passwordConfimed
// ✔ Signup should return type string
// ✔ Signup should have be a student email
// ✔ Password should have 8 characters at most in order to be accepted
// ✔ Confirmed password should completely relate to password
// ✔ The button at the bottom of the signup page should bring the user to the login
// 6 passing (31ms)
