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
    apiKey: "AIzaSyD5gdh0iLkvvLqP3EQEBCpnSumbLdL-ZPA",
    authDomain: "train-schedule-project-744bd.firebaseapp.com",
    databaseURL: "https://train-schedule-project-744bd.firebaseio.com",
    projectId: "train-schedule-project-744bd",
    storageBucket: "train-schedule-project-744bd.appspot.com",
    messagingSenderId: "148334392862"
};
firebase.initializeApp(config);

// Create a variable to reference the database
var database = firebase.database();
//testing write to database
database.ref("/trainInfo").set({
    1:{trainName : "express", trainDest : "meow planet", trainFirst: "07:00", trainFreq:"30" },
    2:{trainName : "express2", trainDest : "meow planet", trainFirst: "08:00", trainFreq:"20" },
    3:{trainName : "express3", trainDest : "meow planet", trainFirst: "09:00", trainFreq:"10" }
});

//create the train display table
function renderTrainTable(database){
    //create table header

    var newTableRow = $("<tr>");
    // abit hard code table header 
    newTableRow.html("<th>Train Name</th><th>Destination</th><th>Frequency</th><th>Next Arrival</th><th>Minutes Away</th>");
    $("#trainTable").append(newTableRow);

    //inner function to render table data entry
    function newDataRow(a,b,c,d,e){
        var newTableRow = $("<tr>");
        newTableRow.html("<td>"+a+"</td>"+"<td>"+b+"</td>"+"<td>"+c+"</td>"+"<td>"+d+"</td>"+"<td>"+e+"</td><hr>" );
        $("#trainTable").append(newTableRow);
    }
    // newDataRow(4,7,6,2,8);

    //inner function calculate time
    //testing moment.js
    console.log(moment().endOf('day').fromNow());
    function calcTime(sth){



    }
    //grab data from database
    database.ref("/trainInfo").on("value",function(snapshot){
        console.log(snapshot.val());

        for(var prop in snapshot.val()){
            if(parseInt(prop)>maxEntry)  maxEntry = parseInt(prop);
            console.log(snapshot.val()[prop]);
            var trainName = snapshot.val()[prop].trainName;
            var trainDest = snapshot.val()[prop].trainDest;
            var trainFirst = snapshot.val()[prop].trainFirst;
            var trainFreq = snapshot.val()[prop].trainFreq;
            newDataRow(trainName,trainDest,trainFreq)
        }
    });

}
var maxEntry =1;  // use this to keep track of train entry index
renderTrainTable(database);


//Deal with add new train form

//grab current time on computer store on varible for calculation
// var currentTime = "";
$("#add-train").on("click",function(event){
    event.preventDefault();
    var newTrainName = $("#name-input").val().trim();
    var newTrainDest = $("#destination-input").val().trim();
    var newTrainFirst = $("#firstTrain-input").val().trim();
    var newTrainFreq = $("#frequency-input").val().trim();

    var newEntryIndex = maxEntry+1;
    console.log(newEntryIndex);
    database.ref("/trainInfo").set({
            [newEntryIndex] : {
                trainName: newTrainName,
                trainDest: newTrainDest,
                trainFirst: newTrainFirst,
                trainFreq: newTrainFreq,
            }
        }
    )


})
