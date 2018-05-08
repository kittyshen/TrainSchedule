/* 
# train schedule
Pseudocode
Step1 Build a table to hold all train data entries.
Step2 Table header including Train Name, Destination, ,Frequency, Next Arrival, Minutes Away
Step3 Build a form following the Table allow user input train information Train Name, Destination, ,Frequency and first train time
Step4 Grab the project ID from firebase database and copy paste to local javascript
Step5 when user hit the submit button, save user input into the firebase storage 
Step6 using database.ref("/train").set({ key1:value1,key2:value2, ... });
Step7 define some local globe varible currentTime which holds the current computer time
Step8 define some local globe and retrieve first train time and Frequency form firebase and do some time calculation
Step9 updating the schedule table using the data from database.ref("/train") snapshot.val().key1 ...
Step10 updating the table's Next Arrival, Minutes Away field with the local varible calculations
Step11 for the bonus auto update table part, using a interval event update the Next Arrival, Minutes Away field ?
*/

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCgWlrgMxnM-bb24w8bPIDfHoVi5xnORP0",
    authDomain: "testing-firebase-37b28.firebaseapp.com",
    databaseURL: "https://testing-firebase-37b28.firebaseio.com",
    projectId: "testing-firebase-37b28",
    storageBucket: "",
    messagingSenderId: "586365601535"
};
firebase.initializeApp(config);

// Create a variable to reference the database
var database = firebase.database();
