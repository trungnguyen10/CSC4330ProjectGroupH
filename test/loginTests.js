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
