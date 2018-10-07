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
    //capture form data
   const train = $("#train").val().trim();
   const destination = $("#destination").val().trim(); 
   const first = $("#first").val().trim(); 
   const frequency = $("#frequency").val().trim(); 

    
    //firebase object
    const trainInfo = {
      train: train,
      destination: destination,
      first: first,
      frequency: frequency,
    }
    
    database.ref().push(trainInfo)
   
    //empty on submit
    $("#train").val("");
    $("#destination").val("");
    $("#first").val("");
    $("#frequency").val("")

   
  })
  
  database.ref().on("child_added", function(childSnapshot) {

    console.log(childSnapshot.val())
    //declare db variables
    const trainDB = childSnapshot.val().train;
    const destinationDB = childSnapshot.val().destination;
    const firstDB = childSnapshot.val().first;
    const frequencyDB = childSnapshot.val().frequency;

    //moment.js
    let firstTrainNew = moment(firstDB, "hh:mm").subtract(1, "years");
    let diffTime = moment().diff(moment(firstTrainNew), "minutes");
    let remainder = diffTime % frequencyDB;
    let minAway = frequencyDB - remainder;
    let nextTrain = moment().add(minAway, "minutes");
    nextTrain = moment(nextTrain).format("hh:mm");

   //create new row variable
    const newRow = $("<tr>").append(
      $("<td>").text(trainDB),
      $("<td>").text(destinationDB),
      $("<td>").text(frequencyDB),
      $("<td>").text(nextTrain),
      $("<td>").text(minAway),
    );

    //append the new row to the table
    $("#new").append(newRow);
  });


        //error handling
    }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
});


 
