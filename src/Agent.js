import TripRepository from '../src/TripRepository';

class Agent {
    constructor(tripData, destinationData) {
        this.trips = new TripRepository(tripData, destinationData);
    }
}

export default Agent;