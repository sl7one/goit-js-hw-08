import Player from '@vimeo/player';
import { data } from 'browserslist';
const throttle = require('lodash.throttle');
console.log(throttle);

const iframe = document.querySelector('[id="vimeo-player"]');

const player = new Player(iframe);

player.on('timeupdate', throttle(onPlay, 1000));
player.on('pause', onPause);

function onPlay({ seconds }) {
  setColor('#4fff9b');
  setLocalStorage(seconds);
}
function onPause() {
  setColor('#ff6e6e');
}

function setColor(color) {
  player
    .setColor(color)
    .then(function (color) {
      // color was successfully set
    })
    .catch(function (error) {
      switch (error.name) {
        case 'ContrastError':
          // the color was set, but the contrast is outside of the acceptable
          // range
          break;

        case 'TypeError':
          // the string was not a valid hex or rgb color
          break;

        case 'EmbedSettingsError':
          // console.log('the owner of the video has chosen to use a specific color');
          break;

        default:
          // some other error occurred
          break;
      }
    });
}

function setLocalStorage(time) {
  localStorage.setItem('videoplayer-current-time', time);
}

function getLocalStorage() {
  return Number(localStorage.getItem('videoplayer-current-time'));
}
const time = getLocalStorage();
player
  .setCurrentTime(time)
  .then(function (seconds) {
    // seconds = the actual time that the player seeked to
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
