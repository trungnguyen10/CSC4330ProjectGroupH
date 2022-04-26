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
