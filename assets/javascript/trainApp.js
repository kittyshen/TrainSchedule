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

//create a globe variable to reference current database image so we can use later as a easy reference point
var currentDataSnap ;

// database.ref("/trainInfo").on("value",function(snapshot){
//     console.log(snapshot.val());
//     currentDataSnap = snapshot.val();
// });

// initial testing object
// var obj = {
//     1:{trainName : "express", trainDest : "meow planet", trainFirst: "07:00", trainFreq:"30" },
//     2:{trainName : "express2", trainDest : "meow planet", trainFirst: "08:00", trainFreq:"20" },
//     3:{trainName : "express3", trainDest : "meow planet", trainFirst: "09:00", trainFreq:"10" },
//     4:{trainName : "express4", trainDest : "meow planet", trainFirst: "09:00", trainFreq:"10" },
// }

// database.ref("/trainInfo").set(obj);
// console.log(currentDataSnap);

//create the train display table
function renderTrainTable(database){
    // clear the table for new render circle
    $("#trainTable").empty();

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
    // console.log(moment().endOf('day').fromNow());
    // console.log(moment().format('LT'));
    
    function calcTimeDiff(start,frequency){
       var difference = Math.abs(moment().diff(moment.unix(start, "X"), "minute"));
    //    difference/frequency
       console.log(moment.unix(start, "X").format("HH:mm"));
       console.log(difference);
       console.log(parseInt(frequency));
       console.log(parseInt(difference) % parseInt(frequency));
       return parseInt(difference) % parseInt(frequency);
    }
    //testing
    calcNextTrain("1525831920","30");
    calcNextTrain("1525849020","60");

    function calcNextTrain(start,frequency){
        console.log(" First Train : " + moment.unix(start, "X").format("HH:mm") + " Train every : "+frequency);
        var difference = Math.abs(moment().diff(moment.unix(start, "X"), "minute"));
        console.log(difference);
        // current 19:50
        // y = 560  //difference 560 mins
        // x =560//30 = 18
        // next train time = 10:30 + (x+1)* 30 = 20:00
        var numberOfTrainPassed = Math.floor(difference/frequency);
        // console.log("numberOfTrainPassed: "+ numberOfTrainPassed);
        // console.log("start time in seconds "+ Math.floor(start/60));
        var nextTrainTime = Math.floor(start/60) + frequency*(numberOfTrainPassed+1);
        // convert train time back to unix time stamp by *60
        console.log("Next train: "+moment.unix(nextTrainTime*60, "X").format("HH:mm")); 
        var train =[]
        train[0] = moment.unix(nextTrainTime*60, "X").format("HH:mm");  // get next train time info
        train[1] = Math.abs(moment().diff(moment.unix(nextTrainTime*60, "X"), "minute")); // get mins away info
        // console.log("fdsfsadf sfdf : "+away2);
        return train;
     }

    //grab data from database
    database.ref("/trainInfo").on("value",function(snapshot){
        // console.log(snapshot.val());
        //store reference of current database image 
        currentDataSnap = snapshot.val();

        for(var prop in snapshot.val()){
            if(parseInt(prop)>maxEntry)  maxEntry = parseInt(prop);
            // console.log(snapshot.val()[prop]);
            var trainName = snapshot.val()[prop].trainName;
            var trainDest = snapshot.val()[prop].trainDest;
            var trainFirst = snapshot.val()[prop].trainFirst;
            var trainFreq = snapshot.val()[prop].trainFreq;
            var nextTrain;
            nextTrain  = calcNextTrain(trainFirst,trainFreq);
            // var trainArrive =
            newDataRow(trainName,trainDest,trainFreq,nextTrain[0],nextTrain[1]);
        }
    });

}
var maxEntry =1;  // use this to keep track of train entry index

renderTrainTable(database);

//Deal with add new train form
$("#add-train").on("click",function(event){
    event.preventDefault();
    // clear the table for new render circle 
    $("#trainTable").empty();

    var newTrainName = $("#name-input").val().trim();
    var newTrainDest = $("#destination-input").val().trim();
    // var newTrainFirst = $("#firstTrain-input").val().trim();
    var newTrainFirst = moment($("#firstTrain-input").val().trim(), "hh/mm").format("X");
    var newTrainFreq = $("#frequency-input").val().trim();
    var newEntryIndex = maxEntry+1;
    console.log(newEntryIndex);

    //grab the value from the user input on the add train form and save it as a new 
    //key/value pair into the current currentDataSnap object
    currentDataSnap[newEntryIndex] = {
        trainName: newTrainName,
        trainDest: newTrainDest,
        trainFirst: newTrainFirst,
        trainFreq: newTrainFreq,
    }
    //write the currentDataSnap object back to the firebase server
    database.ref("/trainInfo").set(currentDataSnap);
    //end of click envet

    //rerender the table
    renderTrainTable(database);

})
