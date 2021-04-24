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
        user.trips.forEach(trip => {
            cardArea.insertAdjacentHTML('afterbegin', `
                <section class="trip-card" style="background-image: linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.5)), url('${trip.destinationInfo.image}');">
                    <section class=${trip.status}> <strong>Status: ${trip.status}</strong></section>
                    <header class="trip-header">
                        <strong>${trip.destinationInfo.destination}</strong>
                        <p>Trip Cost: $${user.tripCost(trip)}</p>
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
        greeting.innerText = `Welcome ${user.name}!`
        tripCost.innerText = `Total Amount Spent On Trips: $${user.totalTripCost()} Total Amount Spent on Trips in the last Year: ${user.lastYearCost()}`
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
    }
}

export default domUpdates;