import chai from 'chai';
const expect = chai.expect;

import Agent from '../src/Agent';

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
    }]
const destinationTestData = [{
    "id": 1,
    "destination": "Lima, Peru",
    "estimatedLodgingCostPerDay": 70,
    "estimatedFlightCostPerPerson": 400,
    "image": "https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80",
    "alt": "overview of city buildings with a clear sky"
}, {
    "id": 25,
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
    "id": 14,
    "destination": "Cartagena, Colombia",
    "estimatedLodgingCostPerDay": 65,
    "estimatedFlightCostPerPerson": 350,
    "image": "https://images.unsplash.com/photo-1558029697-a7ed1a4b94c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
    "alt": "boats at a dock during the day time"
}];

let agent;

describe('Agent', function () {
    beforeEach(function () {
        agent = new Agent(tripTestData, destinationTestData);
    });
    it('should be a function', function () {
        expect(Agent).to.be.a('function');
    });
    it('should take in trip data and set that to a tripRepository with all destination data attached', function () {
        expect(agent.trips.trips).to.eql([
            {
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
            },
            {
                "id": 2,
                "userID": 35,
                "destinationID": 25,
                "travelers": 5,
                "date": "2020/10/04",
                "duration": 18,
                "status": "pending",
                "suggestedActivities": [],
                "destinationInfo": {
                    "id": 25,
                    "destination": "Stockholm, Sweden",
                    "estimatedLodgingCostPerDay": 100,
                    "estimatedFlightCostPerPerson": 780,
                    "image": "https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
                    "alt": "city with boats on the water during the day time"
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
            }, {
                "id": 4,
                "userID": 43,
                "destinationID": 14,
                "travelers": 2,
                "date": "2020/02/25",
                "duration": 10,
                "status": "approved",
                "suggestedActivities": [],
                "destinationInfo": {
                    "id": 14,
                    "destination": "Cartagena, Colombia",
                    "estimatedLodgingCostPerDay": 65,
                    "estimatedFlightCostPerPerson": 350,
                    "image": "https://images.unsplash.com/photo-1558029697-a7ed1a4b94c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
                    "alt": "boats at a dock during the day time"
                }
            }
        ])
    });
    it('sould be able to filter trips by a status', function () {
        expect(agent.trips.filterTrips('pending')).to.eql([{
            "id": 2,
            "userID": 35,
            "destinationID": 25,
            "travelers": 5,
            "date": "2020/10/04",
            "duration": 18,
            "status": "pending",
            "suggestedActivities": [],
            "destinationInfo": {
                "id": 25,
                "destination": "Stockholm, Sweden",
                "estimatedLodgingCostPerDay": 100,
                "estimatedFlightCostPerPerson": 780,
                "image": "https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
                "alt": "city with boats on the water during the day time"
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
        }])
    });
    it('should be a able to calculate the amount an agent has made in the last year', function() {
        expect(agent.yearToDateMoney()).to.equal(1171);
    });
});