import chai from 'chai';
const expect = chai.expect;

import TripRepository from '../src/TripRepository';


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
        "date": "2020/10/04",
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
let tripRepository;
describe('TripRepository', function () {
    beforeEach(function () {
        tripRepository = new TripRepository(tripTestData, destinationTestData);
    });
    it('should be a function', function () {
        expect(TripRepository).to.be.a('function');
    });
    it('should be able to return a trip specified by an ID', function () {
        expect(tripRepository.getTrip(1)).to.eql({
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
        })
        expect(tripRepository.getTrip(75)).to.equal("No Trip Found!");
    });
    it('should be able to return the cost of a specified trip with 10 perfect for travel agent fees', function () {
        expect(tripRepository.tripCost(tripRepository.trips[0])).to.equal(1056);
        expect(tripRepository.tripCost(tripRepository.trips[1])).to.equal(6270);
    });
    it('should calculate the total cost of all trips for a user', function () {
        expect(tripRepository.totalTripCost()).to.equal(15422);
    });
    it('should calculate the total cost of trip from the last year based on todays date', function () {
        expect(tripRepository.lastYearCost()).to.equal(12881);
    });
    it('should be able to return a filtered array by the trips status', function () {
        expect(tripRepository.filterTrips('pending')).to.eql([{
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
        },{
            "id": 3,
            "userID": 3,
            "destinationID": 3,
            "travelers": 4,
            "date": "2020/10/04",
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
    it('should be able to return the number of travelers out on a given day', function () {
        expect(tripRepository.travelersToday("2020/10/05")).to.equal(9);
    });
});