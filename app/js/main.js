document.addEventListener("DOMContentLoaded", function () {
  //setup the standard session of 25 mins and break of 5 mins
  var standardSessionMins = 25;
  var breakTime = 1;
  var startTimeIntId;
  var breakTimeIntId;
  var intervalId;
  var alarm = document.getElementById("alarm");

  function progressBar(setTime, barColor) {
    var elem = document.getElementById("myBar");
    var width = 1;
    intervalId = setInterval(frame, setTime);
    function frame() {
      if (width >= 100) {
        clearInterval(intervalId);
      } else {
        width++;
        elem.style.width = width + "%";
        elem.style.backgroundColor = barColor;
      }
    }
  }

  run();

  //reset the clock
  $("#reset").click(function () {
    init();
  });
  function init() {
    standardSessionMins = 25;
    breakTime = 1;
    $("#current-time").text(("0" + standardSessionMins).slice(-2) + ":00");
    $("#set-session").text(("0" + standardSessionMins).slice(-2) + ":00");
    $("#set-break").text(("0" + breakTime).slice(-2) + ":00");
    var elem = document.getElementById("myBar");
    elem.style.width = 1 + "%";
    elem.style.backgroundColor = "#4CAF50";
    clearInterval(startTimeIntId);
    clearInterval(breakTimeIntId);
    clearInterval(intervalId);
  }

  function run() {
    //setup the standard session of 25 mins and break of 5 mins
    $("#current-time").text(("0" + standardSessionMins).slice(-2) + ":00");
    $("#set-session").text(("0" + standardSessionMins).slice(-2) + ":00");
    $("#set-break").text(("0" + breakTime).slice(-2) + ":00");

    // adjust time interval between 1 - 59 mins for session
    $("#minus-session").click(function () {
      if (standardSessionMins > 1) {
        standardSessionMins -= 1;
        $("#set-session").text(("0" + standardSessionMins).slice(-2) + ":00");
        $("#current-time").text(
          ("0" + standardSessionMins).slice(-2) + "m" + ":00" + "sec"
        );
      }
    });
    $("#plus-session").click(function () {
      if (standardSessionMins < 59) {
        standardSessionMins += 1;
        $("#set-session").text(("0" + standardSessionMins).slice(-2) + ":00");
        $("#current-time").text(
          ("0" + standardSessionMins).slice(-2) + "m" + ":00" + "sec"
        );
      }
    });

    // adjust time interval between 1 -15 mins for break
    $("#minus-break").click(function () {
      if (breakTime > 1) {
        breakTime -= 1;
        $("#set-break").text(("0" + breakTime).slice(-2) + ":00");
      }
    });
    $("#plus-break").click(function () {
      if (breakTime < 15) {
        breakTime += 1;
        $("#set-break").text(("0" + breakTime).slice(-2) + ":00");
      }
    });

    // start the Timer
    $("#start").click(function () {
      startTimer(standardSessionMins);
    });
    function startTimer(standardSessionMins) {
      var currentTime = Date.parse(new Date());
      var session = new Date(currentTime + standardSessionMins * 60 * 1000);
      var barColor = "#4CAF50";
      var sessionColorOnOff = 0;
      var sessionColorElement = document.getElementById("sessionText");
      var clockIcon = document.getElementById("fa-clock");

      // Update the count down every 1 second
      startTimeIntId = setInterval(myTimer, 1000);

      // setup progress bar
      progressBar(standardSessionMins * 600, barColor);
      // Timer
      function myTimer() {
        // Get todays date and time
        var now = new Date().getTime();
        // Find interval
        var interval = session - now;

        // Time calculations for minutes and seconds
        var minutes = Math.floor((interval % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((interval % (1000 * 60)) / 1000);

        // Output the result to element with id="current-time"
        document.getElementById("current-time").innerHTML =
          ("0" + minutes).slice(-2) + "m " + ("0" + seconds).slice(-2) + "s";
        // flash session text green and white while timing
        if (sessionColorOnOff == 0) {
          //document.getElementById("sessionText").style.color = "green";
          sessionColorElement.style.color = "green";
          clockIcon.style.color = "green";
          sessionColorOnOff = 1;
        } else {
          document.getElementById("sessionText").style.color = "white";
          clockIcon.style.color = "white";
          //sessionColorElement.style.color = '#4CAF50';
          sessionColorOnOff = 0;
        }

        // When finished write some text
        if (interval < 0) {
          alarm.play();
          // clear the timer set with the setInterval() method
          clearInterval(startTimeIntId);
          document.getElementById("current-time").innerHTML =
            "Time Up Take a Break";
          window.setTimeout(function () {
            startBreak(breakTime);
          }, 2000);
        }
      }
    }
    function startBreak(breakTime) {
      var currentTime = Date.parse(new Date());
      var session = new Date(currentTime + breakTime * 60 * 1000);
      var barColor = "#d71919";
      var sessionColorOnOff = 0;
      var breakColorElement = document.getElementById("breakText");
      var clockIcon = document.getElementById("fa-clock");

      // Update the count down every 1 second
      breakTimeIntId = setInterval(myTimer, 1000);

      // setup progress bar
      progressBar(breakTime * 600, barColor);
      // Timer
      function myTimer() {
        // Get todays date and time
        var now = new Date().getTime();
        // Find interval
        var interval = session - now;

        // Time calculations for minutes and seconds
        var minutes = Math.floor((interval % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((interval % (1000 * 60)) / 1000);

        // Output the result in an element with id="current-time"
        document.getElementById("current-time").innerHTML =
          minutes + "m " + ("0" + seconds).slice(-2) + "s";

        // flash break text red and white while timing
        if (sessionColorOnOff == 0) {
          //document.getElementById("sessionText").style.color = "green";
          breakColorElement.style.color = "red";
          clockIcon.style.color = "red";
          sessionColorOnOff = 1;
        } else {
          //document.getElementById("sessionText").style.color = "white";
          breakColorElement.style.color = "white";
          clockIcon.style.color = "white";
          sessionColorOnOff = 0;
        }
        // When finished write some text
        if (interval < 0) {
          // clear the timer set with the setInterval() method
          clearInterval(breakTimeIntId);
          document.getElementById("current-time").innerHTML = "Break Time Up";
          //startTimer(5);
        }
      }
    }
  }
});
