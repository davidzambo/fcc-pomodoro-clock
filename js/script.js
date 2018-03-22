var time = {
  'minutes' : 25,
  'seconds' : 0,
  'currentSession' : 'session'
}

function blink(element){
  $('#'+element).css('opacity', 0).animate({'opacity': 1}, 100);
}


function increaseTimer(element){
  let which = document.getElementById(element);
  time.currentSession = element.split('-')[0];
  if (parseInt(which.textContent) < 59 ){
    which.textContent = parseInt(which.textContent)+1;
  } else {
    blink(element);
  }
  setTimer(which.textContent);
}


function decreaseTimer(element){
  let which = document.getElementById(element);
  time.currentSession = element.split('-')[0];
  if (parseInt(which.textContent) > 1 ){
    which.textContent = parseInt(which.textContent) - 1;
  } else {
    blink(element);
  }
  setTimer(which.textContent);
}

function setTimer(number){
  time.minutes = number;
  time.seconds = 1;
  setProgressbar(time);
}

function writeOutRemainingTime(time){
  document.getElementsByClassName('counter-container')[0].innerHTML =
  '<div class="current-timer-title">'+time.currentSession+'<div>\
   <div class="timer">'+niceNumber(time.minutes) + ' : ' + niceNumber(time.seconds)+'</div>';
}

function niceNumber(num){
  if (num < 10){
    return '0'+num;
  } else {
    return num;
  }
}

function decreaseRemainingTime(){
  if (time.seconds === 0){
    if (time.minutes === 0){
      // THE TIME HAS GONE!
      if (time.currentSession === 'session'){
        time.minutes = document.getElementById('break-timer').textContent;
        time.seconds = 1;
        time.currentSession = 'break';
        // alert('The session is over!');
        $('#session-title').text('session');
        $('#exampleModal').modal('show');
        setProgressbar(time);
      } else {
        time.minutes = document.getElementById('session-timer').textContent;
        time.seconds = 1;
        time.currentSession = 'session';
        $('#session-title').text('break');
        $('#exampleModal').modal('show')
        setProgressbar(time);
      }
    } else {
      time.seconds = 60;
      time.minutes--;
    }
  }
  time.seconds--;
  writeOutRemainingTime(time);
}


function setProgressbar(time){
  document.getElementById('progressbar').innerHTML = '';
  var dur = (time.minutes*60 + time.seconds)*1000;
  bar = new ProgressBar.Circle('#progressbar', {
    strokeWidth: 4,
    easying: 'easeInOut',
    duration: dur,
    color: '#7D1935',
    trailColor: '#4A96AD',
    trailWidth: 5,
    svgStyle: {
      display: 'block',
      margin: 'auto',
      width: '90%'
      },
    text: {
        value: '',
        className: 'counter-container text-center',
        style: {
            width: '40%',
            position: 'absolute',
            right: '30%',
            bottom: '45%',
            padding: 0,
            margin: 0,
            color: 'white'
            // You can specify styles which will be browser prefixed
            // transform: {
            //     prefix: true,
            //     value: 'translate(-50%, -50%)'
            // }
        },
      }
  });
  bar.animate(1,0);
}

var pomodo = window.setInterval(decreaseRemainingTime,1000);
var bar;
