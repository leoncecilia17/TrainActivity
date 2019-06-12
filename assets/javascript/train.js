$(document).ready(function () {

    var firebaseConfig = {
        apiKey: "AIzaSyCuTKPv6T9VLzI8lnnrrPLtMfRBW0Nuxz8",
        authDomain: "trainschedule-14a1c.firebaseapp.com",
        databaseURL: "https://trainschedule-14a1c.firebaseio.com",
        projectId: "trainschedule-14a1c",
        storageBucket: "trainschedule-14a1c.appspot.com",
        messagingSenderId: "549143950962",
        appId: "1:549143950962:web:8373f95d3024b192"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    var database = firebase.database();

    $("#add-train-btn").on("click", function (event) {
        event.preventDefault();

        var trainName = $("#train-name-input").val().trim();
        var trainDestination = $("#destination-input").val().trim();
        var trainTime = $("#time-input").val().trim();
        var trainFrequency = $("#frequency-input").val().trim();

        var newTrain = {
            train: trainName,
            destination: trainDestination,
            starttime: trainTime,
            frequency: trainFrequency
        };

        database.ref().push(newTrain);

        console.log(newTrain.train);
        console.log(newTrain.destination);
        console.log(newTrain.starttime);
        console.log(newTrain.frequency);

        alert("Congrats! You have added a new train to the schedule tracker. Check your results at the top!");

        $("#train-name-input").val("");
        $("#destination-input").val("");
        $("#time-input").val("");
        $("#frequency-input").val("");
    });

    database.ref().on("child_added", function (Snapshot) {
        console.log(Snapshot.val());

        var train = Snapshot.val().train;
        var destination = Snapshot.val().destination;
        var starttime = Snapshot.val().starttime;
        var frequency = Snapshot.val().frequency;

        console.log(train);
        console.log(destination);
        console.log(starttime);
        console.log(frequency);


        // Test case 1:
        // 16 - 00 = 16
        // 16 % 3 = 1 (Modulus is the remainder)
        // 3 - 1 = 2 minutes away
        // 2 + 3:16 = 3:18


        var starttimeConverted = moment(starttime, "hh:mm")
        var currentTime = moment();

        var diffTime = currentTime.diff(starttimeConverted, "minutes")
        var tRemainder = diffTime % frequency
        var minsAway = frequency - tRemainder
        var arrivalTime = currentTime.add(minsAway, "minutes")
        arrivalTime = arrivalTime.format("hh:mm a")

        console.log(diffTime)
        if (diffTime < 0) {
            arrivalTime = starttimeConverted.format("hh:mm a")
            minsAway = diffTime * -1
        }

        var tr = $("<tr>");
        tr.append($("<td>").text(train))
        tr.append($("<td>").text(destination))
        tr.append($("<td>").text(frequency))
        tr.append($("<td>").text(arrivalTime))
        tr.append($("<td>").text(minsAway))

        $("tbody").append(tr);

    });
});  