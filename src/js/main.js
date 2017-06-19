document.addEventListener('DOMContentLoaded', function () {

//setup the standard session of 25 mins
  var standardSessionMins = 25;
  $('#set-session').text(standardSessionMins + ':00');

  // adjust time interval between 1 - 59 mins
    $('#minus-session').click(function(){
      if(standardSessionMins > 1){
        standardSessionMins -= 1;
        $('#set-session').text(standardSessionMins + ":00");
      }
    });
    $('#plus-session').click(function(){
      if(standardSessionMins < 59){
        standardSessionMins += 1;
        $('#set-session').text(standardSessionMins + ":00");
      }
    });
    //reset the clock
    $('#reset').click(function(){
       location.reload();
    });

    // start the Timer
    $('#start').click(function(){
      startTimer(standardSessionMins);
    });
    function startTimer(standardSessionMins) {
      var currentTime = Date.parse(new Date());
      var session = new Date(currentTime + standardSessionMins*60*1000);

      // Update the count down every 1 second
      var x = setInterval(myTimer, 1000);
        // Timer
      function myTimer() {

          // Get todays date and time
          var now = new Date().getTime();
          // Find interval
          var interval = session - now;

          // Time calculations for minutes and seconds
          var minutes = Math.floor((interval % (1000 * 60 * 60)) / (1000 * 60));
          var seconds = Math.floor((interval % (1000 * 60)) / 1000);

          // Output the result in an element with id="demo"
          document.getElementById("current-time").innerHTML = minutes + "m " + ("0" + seconds).slice(-2) + "s";

          // When finished write some text
          if (interval < 0) {
              clearInterval(x);
              document.getElementById("current-time").innerHTML = "Time Up";
          }
      }
    }



});
