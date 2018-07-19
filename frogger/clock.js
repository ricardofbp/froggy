var timerVar = null;
var totalSeconds = 0;
var tHour = 0;   
var tMinute = 0;
var tSeconds = 0;

function startTimer() {timerVar = setInterval(countTimer, 1000);}

function countTimer() {
  console.log("h:m:s " + tHour + ":" + tMinute + ":" + tSeconds);
   ++totalSeconds;
    tHour = Math.floor(totalSeconds/3600);
    tMinute = Math.floor((totalSeconds - tHour*3600)/60);
    tSeconds = totalSeconds - (tHour*3600 + tMinute*60);
}

function timerReset() {
  tHour = 0;   
  tMinute = 0;
  tSeconds = 0;
  totalSeconds = 0;
  clearInterval(timerVar);
}

function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}