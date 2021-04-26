const cardArea = document.getElementById('tripCards');

let domUpdates = {
    displayDestinations(destinationData) {
        const tripSlection = document.getElementById('tripSelection');
        destinationData.destinations.forEach(destination => {
            tripSlection.insertAdjacentHTML('afterbegin', `<option value=${destination.id}>${destination.destination}</option>`)
        });
    },
    displayTrips(user) {
        cardArea.innerHTML = "";
        user.trips.trips.forEach(trip => {
            cardArea.insertAdjacentHTML('afterbegin', `
                <section class="trip-card" style="background-image: linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.5)), url('${trip.destinationInfo.image}');">
                    <section class=${trip.status}> <strong>Status: ${trip.status}</strong></section>
                    <header class="trip-header">
                        <strong>${trip.destinationInfo.destination}</strong>
                        <p>Trip Cost: $${user.trips.tripCost(trip)}</p>
                    </header>
                     <div class="trip-body">
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
        const tripCostYear = document.getElementById('tripCostYear');
        greeting.innerText = `Welcome ${user.name}!`
        tripCost.innerText = `Total Amount Spent On Trips: $${user.trips.totalTripCost()}`;
        tripCostYear.innerText = `Total Amount Spent on Trips in the Last Year: $${ user.trips.lastYearCost() }`;
    }, 
    checkIfFilledIn(checkInEle, durationEle, guestEle, destEle) {
        let filledIn = true;
        if(checkInEle.value.length === 0) {
            document.getElementById('checkInError').innerText = "*Please Select A Data";
            filledIn = false;
        }
        if (durationEle.value.length === 0) {
            document.getElementById('durationError').innerText = "*Please Choose Length of Stay";
            filledIn = false;
        }
        if (guestEle.value.length === 0) {
            document.getElementById('guestError').innerText = "*Please Choose Number of Guests";
            filledIn = false;
        }
        if (destEle.value.length === 0) {
            document.getElementById('destError').innerText = "*Please Choose A Destination";
            filledIn = false;
        }
        return filledIn;
    },
    removeErrors() {
        document.getElementById('checkInError').innerText = "";
        document.getElementById('durationError').innerText = "";
        document.getElementById('guestError').innerText = "";
        document.getElementById('destError').innerText = "";
        document.getElementById('loginError').innerText = "";
    },

    loginError() {
        document.getElementById('loginError').innerText = "Username or Password is incorrect. Please TryAgain"
    },
    displayTripRequest() {
        document.getElementById('tripForm').classList.remove('hidden');
        document.getElementById('login').classList.add('hidden');
    }, 
    displayAgentInfo(agent) {
        this.displayAgentGreeting(agent);
        cardArea.innerHTML = "";
        const pendingTrip = agent.trips.filterTrips('pending')
        pendingTrip.forEach(trip => {
            cardArea.insertAdjacentHTML('afterbegin', `
                <section class="trip-card" style="background-image: linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.5)), url('${trip.destinationInfo.image}');">
                    <section class=${trip.status}> 
                        <strong>Status: ${trip.status}</strong>
                        <button data-id=${trip.id} id="acceptTrip" class="acceptButton">Accept</button>
                        <button data-id=${trip.id} id="rejectTrip" class="rejectButton">Reject</button>
                    </section>
                    <header class="trip-header">
                        <strong>${trip.destinationInfo.destination}</strong>
                        <p>Trip Cost: $${agent.trips.tripCost(trip)}</p>
                    </header>
                     <div class="trip-body">
                        <p>Number of Travelers: ${trip.travelers}</p>
                        <p>Departure Date: ${trip.date}</p>
                        <p>Days on Vacation: ${trip.duration}</p>
                    </div>
                </section>`);
        });
    },
    displayAgentGreeting(agent) {
        const greeting = document.getElementById('welcomeMessage');
        const tripCost = document.getElementById('tripCost');
        const tripCostYear = document.getElementById('tripCostYear');
        greeting.innerText = `Welcome Agency!`;
        tripCost.innerText = `Travelers on Vacation Today!: ${agent.trips.travelersToday(new Date())}`;
        tripCostYear.innerText = `Total income from last year: $${agent.yearToDateMoney()}`;
    }, 
    agentMessage(message) {
        console.log(message);
        const agentMessageSpan = document.getElementById('agentMessage');
        agentMessageSpan.innerText = message;
    }
}

export default domUpdates;