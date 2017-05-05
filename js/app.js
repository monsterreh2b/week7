// Initialize Firebase
var config = {
    apiKey: "AIzaSyAk7Y-XJLibFS6Wf5FXlaeaGsOeTr0qjKc",
    authDomain: "han-1-a9be5.firebaseapp.com",
    databaseURL: "https://han-1-a9be5.firebaseio.com",
    projectId: "han-1-a9be5",
    storageBucket: "han-1-a9be5.appspot.com",
    messagingSenderId: "41665711358"
  };

  firebase.initializeApp(config);

var database = firebase.database();

$("#add-employee").on("click", function(){
  var name = $("#name-input").val().trim();
  var dest = $("#dest-input").val().trim();
  var start = $("#start-input").val().trim();
  var rate = $("#rate-input").val().trim();
  
  

  database.ref().push({
    name: name,
    dest: dest,
    start: start,
    rate: rate
      
});

});

// Firebase watcher + initial loader HINT: .on("value")
database.ref().on("child_added", function(snapshot) {

  // storing the snapshot.val() in a variable for convenience
  var sv = snapshot.val();
  console.log(sv);
  console.log('<tr>');
  console.log(sv.name);
  console.log(sv.dest);
  console.log(sv.start);
  console.log(sv.rate);

  // $(".table").append("<div class='well'><span id='name'> " + sv.name +
  // " </span><span id='dest'> " + sv.dest +
  // " </span><span id='date'> " + sv.date +
  // " </span><span id='rate'> " + sv.rate + " </span></div>");


  // var convertedDate = moment(new Date(sv.start));

  // console.log(moment(convertedDate).diff(moment(), "hours"));
  // console.log(moment(sv.start))
  // var tFrequency = sv.start;
  // var currentTime = moment();
  // console.log(currentTime);
  // var nextArrival = moment().add(sv.rate, 'm'); 
  // console.log(nextArrival);

  // var minAway = moment().diff();


   // Assumptions
    var tFrequency = sv.rate;
    // Time is 3:30 AM
    var firstTime = sv.start;
    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);
    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);
    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);
    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;

    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm a"));
    var nextTrain2 = moment(nextTrain).format("hh:mm a");

  var newRow = $('<tr>');

  var newCell = $('<td>');
  newCell.text(sv.name);
  newRow.append(newCell);

  var newCell = $('<td>');
  newCell.text(sv.dest);
  newRow.append(newCell);

  // var newCell = $('<td>');
  // newCell.text(sv.start);
  // newRow.append(newCell);

  var newCell = $('<td>');
  newCell.text(sv.rate);
  newRow.append(newCell);

  var newCell = $('<td>');
  newCell.text(nextTrain2);
  newRow.append(newCell);

  var newCell = $('<td>');
  newCell.text(tMinutesTillTrain);
  newRow.append(newCell);

  $('tbody').append(newRow);

  // // Getting the first row of the table
  // var firstRowTds = $("table")
  //   .children()
  //   .eq(1)
  //   .children("tr")
  //   .eq(0)
  //   .children("td");

  // // Setting the inner text of each td in the first row
  // firstRowTds.eq(0).text(response.Title);
  //
  // firstRowTds.eq(1).text(response.Year);
  //
  // firstRowTds.eq(2).text(response.Actors);
//});



  // // Handle the errors
 },function(errorObject) {
 console.log("Errors handled: " + errorObject.code);
});
