import chai from 'chai';
const expect = chai.expect;

import User from '../src/User';

const travelersTestData = [{
    "id": 1,
    "name": "Ham Leadbeater",
    "travelerType": "relaxer",
    }, {
        "id": 2,
        "name": "Rachael Vaughten",
        "travelerType": "thrill-seeker",
    }, {
        "id": 3,
        "name": "Sibby Dawidowitsch",
        "travelerType": "shopper",
    }, {
        "id": 4,
        "name": "Leila Thebeaud",
        "travelerType": "photographer",
    }, {
        "id": 5,
        "name": "Tiffy Grout",
        "travelerType": "thrill-seeker",
    }, {
        "id": 6,
        "name": "Laverna Flawith",
        "travelerType": "shopper",
    }, {
        "id": 7,
        "name": "Emmet Sandham",
        "travelerType": "relaxer",
    }];
let user;
describe('User', function() {
    beforeEach(function() {
        user = new User(travelersTestData[2]);
    });
    it('should be a function', function() {
        expect(User).to.be.a('function');
    });
    it('should take in traveler data and have and id a name and travelerType', function() {
        expect(user.id).to.equal(3);
        expect(user.name).to.equal("Sibby Dawidowitsch");
        expect(user.travelerType).to.equal("shopper");
    });
});