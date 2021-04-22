import './css/index.scss';
import domUpdates from './domUpdates';
import User from './User';

const submitButton = document.getElementById('tripRequestSubmit');


const getDestinationData = () => fetch("http://localhost:3001/api/v1/destinations")
    .then(response => checkForError(response))
    .catch(err => console.log(`User API Error: ${err.message}`));

const getTravelerData = () => fetch("http://localhost:3001/api/v1/travelers")
    .then(response => checkForError(response))
    .catch(err => console.log(`Ingredients API Error: ${err.message}`));

const getTripData = () => fetch("http://localhost:3001/api/v1/trips")
    .then(response => checkForError(response))
    .catch(err => console.log(`Recipe API Error: ${err.message}`));

function getData() {
    return Promise.all([getTravelerData(), getTripData(), getDestinationData()])
}

const checkForError = response => {
    if (!response.ok) {
        throw new Error('Something went wrong, please try again.');
    } else {
        return response.json();
    }
}

let travelerData, tripData, destinationData, user;

submitButton.addEventListener('click', submitTripForm);

window.onload = onStartup();

function onStartup() {
    getData()
        .then(([getTravelerData, getTripData, getDestinationData])=> {
            travelerData = getTravelerData
            tripData = getTripData
            destinationData = getDestinationData
            domUpdates.displayDestinations(destinationData)
            user = new User(travelerData.travelers[2], tripData.trips, destinationData.destinations)
            domUpdates.displayTrips(user);
            domUpdates.greetUser(user);
        });
}

function submitTripForm() {
    domUpdates.removeErrors();
    const checkInEle = document.getElementById('checkIn');
    const durationEle = document.getElementById('duration');
    const guestEle = document.getElementById('numberGuests');
    const destEle = document.getElementById('tripSelection');
    if (domUpdates.checkIfFilledIn(checkInEle, durationEle, guestEle, destEle)) {
        let checkIn = checkInEle.value;
        const durationTrip = durationEle.value;
        const numberGuest = guestEle.value;
        const destID = destEle.value;
        checkIn = checkIn.replaceAll('-', '/');
        const tripObj = {
            id: Date.now(),
            userID: user.id,
            destinationID: Number(destID),
            travelers: Number(numberGuest),
            date: checkIn,
            duration: Number(durationTrip),
            status: 'pending',
            suggestedActivities: []
        };
        checkInEle.value = "";
        durationEle.value = "";
        guestEle.value = "";
        destEle.value = "";
        return fetch("http://localhost:3001/api/v1/trips", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tripObj)
        })
            .then(response => {
                checkForError(response)
            })
            .then(response => updateUser(tripObj))
            .catch(err => console.log(`POST Request Error: ${err.message}`))
    }
}

function updateUser(tripObj) {
    tripData.trips.push(tripObj);
    user.trips = user.findMyTrips(tripData.trips, destinationData.destinations);
    domUpdates.displayTrips(user);
    domUpdates.greetUser(user);
}