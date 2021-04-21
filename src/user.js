class User {
    constructor(traveler, tripData, destinationData) {
        this.id = traveler.id;
        this.name = traveler.name;
        this.travelerType = traveler.travelerType;
        this.trips = this.findMyTrips(tripData, destinationData);
    }

    findMyTrips(tripData, destinationData) {
        let myTrips = tripData.filter(trip => trip.userID === this.id);
        myTrips.forEach(trip => {
            const destinationIndex = destinationData.findIndex(destination => destination.id === trip.destinationID);
            trip.destinationInfo = destinationData[destinationIndex];
        });
        return myTrips;
    }
}

export default User;