const cardArea = document.getElementById('tripCards');

let domUpdates = {
    displayDestinations(destinationData) {
        const tripSlection = document.getElementById('tripSelection');
        destinationData.destinations.forEach(destination => {
            tripSlection.insertAdjacentHTML('afterbegin', `<option value=${destination.destination}>${destination.destination}</option>`)
        });
    },
    displayTrips(user) {
        cardArea.innerHTML = "";
        user.trips.forEach(trip => {
            cardArea.insertAdjacentHTML('afterbegin', `
                <section class="trip-card" style="background-image: url('${trip.destinationInfo.image}');">
                    <header class="trip-header">
                        <strong>${trip.destinationInfo.destination}</strong>
                        <p>Trip Cost: $${user.tripCost(trip)}</p>
                    </header>
                    <div class="trip-body">
                        <strong>Status: ${trip.status}</strong>
                        <p>Number of Travelers: ${trip.travelers}</p>
                        <p>Departure Date: ${trip.date}</p>
                        <p>Days on Vacation: ${trip.duration}</p>
                    </div>
                </section>`);
        });
    },
    greetUser(user) {
        const greeting = document.getElementById('welcomeMessage');
        const tripCost = document.getElementById('tripCost');
        greeting.innerText = `Welcome ${user.name}!`
        tripCost.innerText = `Total Amount Spent On Trips: $${user.totalTripCost()}`
    }
}

export default domUpdates;