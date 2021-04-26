import './css/index.scss';
import domUpdates from './domUpdates';
import User from './User';
import Agent from './Agent';
import TripRepository from './TripRepository';

const submitTripButton = document.getElementById('tripRequestSubmit');
const submitLoginButton = document.getElementById('loginSubmit');
const userSelectSubmit = document.getElementById('userSelectSubmit');
const tripArea = document.getElementById('tripSection');


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

submitTripButton.addEventListener('click', submitTripForm);
submitLoginButton.addEventListener('click', checkLogin);
userSelectSubmit.addEventListener('click', displayUser);
tripArea.addEventListener('click', cardButtonCheck);

window.onload = onStartup();

function onStartup() {
    getData()
        .then(([getTravelerData, getTripData, getDestinationData])=> {
            travelerData = getTravelerData
            tripData = getTripData
            destinationData = getDestinationData
            domUpdates.displayDestinations(destinationData)
        });
}

function cardButtonCheck(event) {
    if (event.target.id === 'acceptTrip') {
        acceptTrip(event.target.dataset.id);
    } else if (event.target.id === 'rejectTrip') {
        rejectTrip(event.target.dataset.id);
    }
}

function acceptTrip(id) {
    const tripObj = { id: Number(id), status: 'approved'};
    return fetch("http://localhost:3001/api/v1/updateTrip", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tripObj)
    })
        .then(response => {
            checkForError(response)
        })
        .then(response => updateAgent(id))
        .catch(err => console.log(`POST Request Error: ${err.message}`))
}

function rejectTrip(id) {
    return fetch(`http://localhost:3001/api/v1/trips/${id}`, {
        method: 'DELETE',
    })
    .then(response => {
        checkForError(response)
    })
    .then(response => removeTrip(id))
    .catch(err => console.log(`POST Request Error: ${err.message}`))
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

function checkLogin() {
    domUpdates.removeErrors();
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    let userCheck = username.value.substring(0, 8);
    if(username.value === 'agency' && password.value === 'travel2020') {
        loginAgent();
        return;
    }
    if(userCheck !== 'traveler') {
        clearValue(username, password);
        domUpdates.loginError();
        return
    }
    userCheck = username.value.substring(8);
    const foundUser = findUser(userCheck);
    if(foundUser === -1) {
        clearValue(username, password);
        domUpdates.loginError();
        return
    }
    if(password.value !== 'travel2020') {
        clearValue(username, password);
        domUpdates.loginError();
        return
    }
    loginUser(userCheck);
}

function clearValue(username, password) {
    username.value = "";
    password.value = "";
}

function findUser(userCheck) {
    const userIndex = travelerData.travelers.findIndex(data => data.id === Number(userCheck));
    return userIndex;
}

function loginUser(userIndex) {
    fetch(`http://localhost:3001/api/v1/travelers/${userIndex}`)
        .then(response => checkForError(response))
        .then(response => {
            user = new User(response, tripData.trips, destinationData.destinations);
            domUpdates.displayTrips(user);
            domUpdates.greetUser(user);
            domUpdates.displayTripRequest();
        })
        .catch(err => console.log(err))
}

function loginAgent() {
    user = new Agent(tripData.trips, destinationData.destinations);
    domUpdates.displayAgentInfo(user, travelerData);
}

function updateUser(tripObj) {
    tripData.trips.push(tripObj);
    user.trips = new TripRepository(user.findMyTrips(tripData.trips), destinationData.destinations);
    domUpdates.displayTrips(user);
    domUpdates.greetUser(user);
}

function updateAgent(id) {
    const index = user.trips.trips.findIndex(trip => trip.id === Number(id));
    user.trips.trips[index].status = 'approved';
    domUpdates.agentMessage(`Apporved Trip to ${user.trips.trips[index].destinationInfo.destination}`);
    domUpdates.displayAgentInfo(user, travelerData);
}

function removeTrip(id) {
    const index = user.trips.trips.findIndex(trip => trip.id === Number(id));
    domUpdates.agentMessage(`Removed Trip to ${user.trips.trips[index].destinationInfo.destination}`);
    user.trips.trips.splice(index, 1);
    domUpdates.displayAgentInfo(user, travelerData);
}

function displayUser() {
    domUpdates.removeErrors();
    const travelerSelected = document.getElementById('travelerSelect');
    if(travelerSelected.value !== "") {
        domUpdates.agentDisplayUserSelectTrips(user.trips.userTrips(Number(travelerSelected.value)), user);
    } else {
        domUpdates.agentTravelerSelectError();
    }

}