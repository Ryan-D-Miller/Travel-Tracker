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
const tripTestData = [
    {
        "id": 1,
        "userID": 3,
        "destinationID": 1,
        "travelers": 1,
        "date": "2019/09/16",
        "duration": 8,
        "status": "approved",
        "suggestedActivities": []
    },
    {
        "id": 2,
        "userID": 35,
        "destinationID": 25,
        "travelers": 5,
        "date": "2020/10/04",
        "duration": 18,
        "status": "pending",
        "suggestedActivities": []
    }, {
        "id": 3,
        "userID": 3,
        "destinationID": 3,
        "travelers": 4,
        "date": "2020/05/22",
        "duration": 17,
        "status": "pending",
        "suggestedActivities": []
    }, {
        "id": 4,
        "userID": 43,
        "destinationID": 14,
        "travelers": 2,
        "date": "2020/02/25",
        "duration": 10,
        "status": "approved",
        "suggestedActivities": []
    }, {
        "id": 5,
        "userID": 42,
        "destinationID": 29,
        "travelers": 3,
        "date": "2020/04/30",
        "duration": 18,
        "status": "approved",
        "suggestedActivities": []
    }]
const destinationTestData = [{
    "id": 1,
    "destination": "Lima, Peru",
    "estimatedLodgingCostPerDay": 70,
    "estimatedFlightCostPerPerson": 400,
    "image": "https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80",
    "alt": "overview of city buildings with a clear sky"
    }, {
        "id": 2,
        "destination": "Stockholm, Sweden",
        "estimatedLodgingCostPerDay": 100,
        "estimatedFlightCostPerPerson": 780,
        "image": "https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        "alt": "city with boats on the water during the day time"
    },
    {
        "id": 3,
        "destination": "Sydney, Austrailia",
        "estimatedLodgingCostPerDay": 130,
        "estimatedFlightCostPerPerson": 950,
        "image": "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        "alt": "opera house and city buildings on the water with boats"
    },
    {
        "id": 4,
        "destination": "Cartagena, Colombia",
        "estimatedLodgingCostPerDay": 65,
        "estimatedFlightCostPerPerson": 350,
        "image": "https://images.unsplash.com/photo-1558029697-a7ed1a4b94c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
        "alt": "boats at a dock during the day time"
    }];
let user;
describe('User', function() {
    beforeEach(function() {
        user = new User(travelersTestData[2], tripTestData, destinationTestData);
    });
    it('should be a function', function() {
        expect(User).to.be.a('function');
    });
    it('should take in traveler data and have and id a name and travelerType', function() {
        expect(user.id).to.equal(3);
        expect(user.name).to.equal("Sibby Dawidowitsch");
        expect(user.travelerType).to.equal("shopper");
    });
    it('should take in an array of trips and find the trips that are for that user and save them to their trips array', function() {
        expect(user.trips).to.eql([{
            "id": 1,
            "userID": 3,
            "destinationID": 1,
            "travelers": 1,
            "date": "2019/09/16",
            "duration": 8,
            "status": "approved",
            "suggestedActivities": [],
            "destinationInfo": {
                "id": 1,
                "destination": "Lima, Peru",
                "estimatedLodgingCostPerDay": 70,
                "estimatedFlightCostPerPerson": 400,
                "image": "https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80",
                "alt": "overview of city buildings with a clear sky"
            }
        }, {
            "id": 3,
            "userID": 3,
            "destinationID": 3,
            "travelers": 4,
            "date": "2020/05/22",
            "duration": 17,
            "status": "pending",
            "suggestedActivities": [],
            "destinationInfo": {
                "id": 3,
                "destination": "Sydney, Austrailia",
                "estimatedLodgingCostPerDay": 130,
                "estimatedFlightCostPerPerson": 950,
                "image": "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
                "alt": "opera house and city buildings on the water with boats"
            }
        }]);
    });
});