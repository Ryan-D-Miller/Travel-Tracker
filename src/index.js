import './css/index.scss';
import domUpdates from './domUpdates';
import User from './User';

const submitTripButton = document.getElementById('tripRequestSubmit');
const submitLoginButton = document.getElementById('loginSubmit');


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

function updateUser(tripObj) {
    tripData.trips.push(tripObj);
    user.trips = user.findMyTrips(tripData.trips, destinationData.destinations);
    domUpdates.displayTrips(user);
    domUpdates.greetUser(user);
}