class TripRepository {
    constructor(tripData, destData) {
        this.trips = this.setTripDest(tripData, destData);
    }

    setTripDest(trips, destinationData) {
        trips.forEach(trip => {
            const destinationIndex = destinationData.findIndex(destination => destination.id === trip.destinationID);
            trip.destinationInfo = destinationData[destinationIndex];
        });
        return trips;
    }

    getTrip(tripID) {
        const tripIndex = this.trips.findIndex(trip => trip.id === tripID);
        if (tripIndex === -1) {
            return "No Trip Found!"
        }
        return this.trips[tripIndex];
    }

    tripCost(trip) {
        let tenPercent;
        let cost = (trip.duration * trip.destinationInfo.estimatedLodgingCostPerDay) + (trip.travelers * trip.destinationInfo.estimatedFlightCostPerPerson)
        tenPercent = cost * .1;
        cost = cost + tenPercent;
        return cost;
    }

    totalTripCost() {
        const totalCost = this.trips.reduce((acc, trip) => {
            return acc + this.tripCost(trip);
        }, 0);
        return totalCost;
    }
    
    lastYearCost() {
        let today = new Date();
        let lastYear = new Date();
        lastYear.setFullYear(lastYear.getFullYear() - 1);
        let price = this.trips.reduce((acc, trip) => {
            const tripDate = new Date(trip.date);
            if (tripDate < today && tripDate > lastYear) {
                return acc + this.tripCost(trip);
            }
            return acc;
        }, 0);
        return price;
    }

    filterTrips(status) {
        return this.trips.filter(trip => trip.status === status); 
    }

    travelersToday(date) {
        const checkDate = new Date(date);
        const travelers = this.trips.reduce((acc, trip) => {
            const startDate = new Date(trip.date);
            let endDate = new Date(trip.date);
            endDate.setDate(endDate.getDate() + trip.duration);
            if(checkDate >= startDate && endDate >= checkDate) {
                return acc + trip.travelers;
            }
            return acc;
        }, 0);
        return travelers;
    }
}

export default TripRepository;