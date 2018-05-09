# TrainSchedule
 UC Berkeley coding assignment 7-1

 # Firebase Assignment - Train Scheduler (Basic - Recommended)

##### _Because that Rock Paper Scissors Game is Too Damn Hard really? fdfdfdf let meow try this first_

### Overview

In this assignment, you'll create a train schedule application that incorporates Firebase to host arrival and departure data. Your app will retrieve and manipulate this information with Moment.js. This website will provide up-to-date information about various trains, namely their arrival times and how many minutes remain until they arrive at their station.

### Setup

* We'll leave that up to you -- however you like. Just make sure you're using Firebase to store data, GitHub to backup your project, and GitHub Pages to host your finished site.

### Instructions

* Make sure that your app suits this basic spec:
  * When adding trains, administrators should be able to submit the following:
    * Train Name
    * Destination 
    * First Train Time -- in military time
    * Frequency -- in minutes
  * Code this app to calculate when the next train will arrive; this should be relative to the current time.
  * Users from many different machines must be able to view same train times.
  * Styling and theme are completely up to you. Get Creative!

### Bonus (Extra Challenges)

* Consider updating your "minutes to arrival" and "next train time" text once every minute. This is significantly more challenging; only attempt this if you've completed the actual activity and committed it somewhere on GitHub for safekeeping (and maybe create a second GitHub repo).

* Try adding `update` and `remove` buttons for each train. Let the user edit the row's elements-- allow them to change a train's Name, Destination and Arrival Time (and then, by relation, minutes to arrival).

* As a final challenge, make it so that only users who log into the site with their Google or GitHub accounts can use your site. You'll need to read up on Firebase authentication for this bonus exercise.


## Technology used
* [Firebase online storage](https://firebase.google.com/)
* jQuery and javascript AJAX
* Html
* Css
* Bootstrap framework 


## Key learning points
```javascript
database.ref("/trainInfo").set(obj);
```
* syntax for reference a fire base database with subFolder and set it with new object

```javascript
database.ref("/trainInfo").on("value",function(snapshot){
  currentDataSnap = snapshot.val();
    for(var prop in snapshot.val()){
      if(parseInt(prop)>maxEntry) {
        maxEntry = parseInt(prop);  //keeptrack of the current max index number of entries 
      } 
      var trainName = snapshot.val()[prop].trainName;
      ...
      var nextTrain;
      nextTrain  = calcNextTrain(trainFirst,trainFreq);
      newDataRow(trainName,trainDest,trainFreq,nextTrain[0],nextTrain[1]);
    }
});
```
* syntax for retrieve a fire base database data, need to add [] on property key to retrive value, function can return multiple value if return an array datatype

```javascript
  var newTrainFirst = moment($("#firstTrain-input").val().trim(), "HH/mm").format("X");
```
* syntax moment js to convert time entry into uxit time formate

```javascript
currentDataSnap[newEntryIndex] = {
    trainName: newTrainName,
    ...
}
database.ref("/trainInfo").set(currentDataSnap);
```
* if using a variable to dymanic assign key:value pair to a obj, make sure to put the key varialble inside a [ ]


```javascript
function calcNextTrain(start,frequency){
    var difference = Math.abs(moment().diff(moment.unix(start, "X"), "minute"));
    var numberOfTrainPassed = Math.floor(difference/frequency);
    var nextTrainTime = Math.floor(start/60) + frequency*(numberOfTrainPassed+1);
    var train =[]
    train[0] = moment.unix(nextTrainTime*60, "X").format("HH:mm"); // get next train time info
    train[1] = Math.abs(moment().diff(moment.unix(nextTrainTime*60, "X"), "minute")); 
    return train;
}
```
* very hard moment.js function calls which involve impossible to read unix timestamp. this short code took me hours to figure out. maybe there are better funtion to calc time difference that I am not aware of.


## Installation
Download the zip file, unzip on the desktop, open index.html

## Link to the site
[Click me](https://kittyshen.github.io/TrainSchedule/)

## Author 
[Kitty Shen ](https://github.com/kittyshen)

https://github.com/kittyshen

## License
Standard MIT License

