import chai from 'chai';
const expect = chai.expect;

import User from '../src/User';

describe('User', function() {
    it('should be a function', function() {
        expect(User).to.be.a('function');
    });
});