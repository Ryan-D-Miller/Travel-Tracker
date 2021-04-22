import './css/index.scss';
import domUpdates from './domUpdates';
import User from './User';


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