'use strict';

// Checks that the Firebase SDK has been correctly setup and configured.
function checkSetup() {
    if (!window.firebase || !(firebase.app instanceof Function) || !firebase.app().options) {
        window.alert('You have not configured and imported the Firebase SDK. ' +
            'Make sure you go through the codelab setup instructions and make ' +
            'sure you are running the codelab using `firebase serve`');
    }
}

// Checks that Firebase has been imported.
checkSetup();

M.AutoInit();
M.Range.init(document.querySelectorAll('#range'));
M.CharacterCounter.init(document.querySelectorAll('#textarea'));

// Sample of array: [0] ~ [3]
var textElementsArray = new Array();
textElementsArray.push(document.getElementById('first_name'));
textElementsArray.push(document.getElementById('last_name'));
textElementsArray.push(document.getElementById('email'));
textElementsArray.push(document.getElementById('textarea'));

// Sample of map
var elementsMap = new Map();
elementsMap.set('first_name', document.getElementById('first_name'));
elementsMap.set('last_name', document.getElementById('last_name'));
elementsMap.set('email', document.getElementById('email'));
elementsMap.set('range', document.getElementById('range'));
elementsMap.set('textarea', document.getElementById('textarea'));
elementsMap.set('submit', document.getElementById('submit'));

var submitButtonElement = elementsMap.get('submit');
submitButtonElement.addEventListener('click', onMessageFormSubmit);

function onMessageFormSubmit(e) {
    e.preventDefault();
    saveData(elementsMap).then(function () {
        textElementsArray.forEach(function (element) {
            element.value = '';
        });
        elementsMap.get('range').value = 5;
        M.toast({ html: 'Success! Thank you for sharing your opinion!', displayLength: 3500 });
    });
}

// Saves a new message to your Cloud Firestore database.
function saveData(dataMap) {
    // Add a new message entry to the database.
    return firebase.firestore().collection('opinions').add({
        name: dataMap.get('first_name').value + ' ' + dataMap.get('last_name').value,
        email: dataMap.get('email').value,
        rating: dataMap.get('range').value,
        opinion: dataMap.get('textarea').value,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).catch(function (error) {
        console.error('Error writing new message to database', error);
    });
}
