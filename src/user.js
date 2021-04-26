import TripRepository from '../src/TripRepository';

class User {
    constructor(traveler, tripData, destinationData) {
        this.id = traveler.id;
        this.name = traveler.name;
        this.travelerType = traveler.travelerType;
        this.trips = new TripRepository(this.findMyTrips(tripData), destinationData);
    }

    findMyTrips(tripData) {
        let myTrips = tripData.filter(trip => trip.userID === this.id);
        return myTrips;
    }
}

export default User;