$(document).ready(function(){ 

 
 
 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDqtcjf12gyX2r21GmJVrL2-fR62IfjnTE",
    authDomain: "trainscheduler-e90b0.firebaseapp.com",
    databaseURL: "https://trainscheduler-e90b0.firebaseio.com",
    projectId: "trainscheduler-e90b0",
    storageBucket: "",
    messagingSenderId: "202092948248"
  };
  firebase.initializeApp(config);

  // firebase variable

  const database = firebase.database();

  //onclick function

  $("#add").click( function() {
    event.preventDefault();

   var train = $("#train").val().trim();
   var destination = $("#destination").val().trim(); 
   var first = $("#first").val().trim(); 
   var frequency = $("#frequency").val().trim(); 

    
    //firebase push

    var trainInfo = {
      train: train,
      destination: destination,
      first: first,
      frequency: frequency,
      timeAdded: firebase.database.ServerValue.TIMESTAMP
    }
    
    database.ref().push(trainInfo)
   
    //empty on submit
    $("#train").val("");
    $("#destination").val("");
    $("#first").val("");
    $("#frequency").val("")

    $(".show").show();
  })
  
  database.ref().on("child_added", function(childSnapshot) {

    console.log(childSnapshot.val())

    const trainDB = childSnapshot.val().train;
    const destinationDB = childSnapshot.val().destination;
    const firstDB = childSnapshot.val().first;
    const frequencyDB = childSnapshot.val().frequency;

    
    var minAway;
    // Chang year so first train comes before now
    var firstTrainNew = moment(firstDB, "hh:mm").subtract(1, "years");
    // Difference between the current and firstTrain
    var diffTime = moment().diff(moment(firstTrainNew), "minutes");
    var remainder = diffTime % frequencyDB;
    // Minutes until next train
    var minAway = frequencyDB - remainder;
    // Next train time
    var nextTrain = moment().add(minAway, "minutes");
    nextTrain = moment(nextTrain).format("hh:mm");

    $("#new").append("<tr><td>" + trainDB +
            "</td><td>" + destinationDB +
            "</td><td>" + frequencyDB +
            "</td><td>" + nextTrain + 
            "</td><td>" + minAway + "</td></tr>");

        // Handle the errors
    }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
});


 
})