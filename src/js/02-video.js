import Player from '@vimeo/player';
const throttle = require('lodash.throttle');

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const STORAGE_KEY = 'videoplayer-current-time';

player.on('play', function () {
  console.log('played the video!');
});

player.on('timeupdate', throttle(timeProgressMemory, 1000));

function timeProgressMemory(e) {
  localStorage.setItem(STORAGE_KEY, e.seconds);
  let a = localStorage.getItem(STORAGE_KEY);
  console.log(a);
}

let storageValue = localStorage.getItem(STORAGE_KEY);

if (storageValue) {
  player
    .setCurrentTime(storageValue)
    .then(function () {
      console.log(`continued in ${storageValue} s`);
    })
    .catch(function (error) {
      switch (error.name) {
        case 'RangeError':
          // the time was less than 0 or greater than the video’s duration
          break;

        default:
          // some other error occurred
          break;
      }
    });
}
