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

  let firebase = firebase.database();

  //variables

  let train
  let destination
  let first
  let frequency = 0

  //onclick function

  $("#add").submit(function() {
    event.preventDefault();
    train = $("#train").val().trim();
    destination = $("#destination").val().trim(); 
    first = $("#first").val().trim(); 
    frequency = $("#frequency").val().trim();  

    //firebase push
    database.ref().push({
      train: train,
      destination: destination,
      first: first,
      timeAdded: firebase.database.ServerValue.TIMESTAP
    })
    //empty on submit
    $("#train-form").empty()
  })

 

  //write to page