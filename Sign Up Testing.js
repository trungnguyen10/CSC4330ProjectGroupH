const assert = require('chai').assert;
const signUp = require('../test/signupPractice').signUp;

describe('Signup', function() {
    it('Signup should allow you to fill in name, email, password, passwordConfimed', function() {
        let result = signUp();
        assert.equal(result, 'name, email, password, passwordConfimed');
    });

    it('Signup should allow for type string', function() {
        let result = signUp();
        assert.typeOf(result, string);
    });
});
