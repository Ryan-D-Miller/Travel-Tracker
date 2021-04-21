// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'

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

let travelerData, tripData, destinationData;


window.onload = onStartup();

function onStartup() {
    getData()
        .then(([getTravelerData, getTripData, getDestinationData])=> {
            travelerData = getTravelerData;
            tripData = getTripData;
            destinationData = getDestinationData;
            console.log(travelerData);
            console.log(tripData);
            console.log(destinationData);
        });
}