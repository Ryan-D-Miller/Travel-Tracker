import TripRepository from '../src/TripRepository';

class Agent {
    constructor(tripData, destinationData) {
        this.trips = new TripRepository(tripData, destinationData);
    }

    yearToDateMoney() {
        let today = new Date();
        let lastYear = new Date();
        lastYear.setFullYear(lastYear.getFullYear() - 1);
        let price = this.trips.trips.reduce((acc, trip) => {
            const tripDate = new Date(trip.date);
            if (tripDate < today && tripDate > lastYear) {
                return acc + this.agentCost(trip);
            }
            return acc;
        }, 0);
        return price;
    }

    agentCost(trip) {
        let agentCost;
        let cost = (trip.duration * trip.destinationInfo.estimatedLodgingCostPerDay) + (trip.travelers * trip.destinationInfo.estimatedFlightCostPerPerson)
        agentCost = cost * .1;
        return agentCost;
    }
}

export default Agent;