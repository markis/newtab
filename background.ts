import { cache } from './utilities/cache';

/* disabling tslint no-string-literal so that the code will work with google closure */
/* tslint:disable:no-string-literal */
const alarms = chrome['alarms'];
const onAlarm = alarms['onAlarm'];
/* tslint:enable:no-string-literal */

function getBackground() {
  fetch('http://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1')
    .then(r => r.json())
    .then(data => cache.setItem('photo', 'http://www.bing.com' + data.images[0].url))
    .then(url => fetch(url))
    .then(() => createBackgroundAlarm())
    .catch((e) => {
      console.error(e);

      let date = new Date();
      date.setMinutes(date.getMinutes() + 5);
      createBackgroundAlarm(date);
    });
}

function createBackgroundAlarm(date?: Date) {
  if (!date) {
    const now = new Date();
    date = new Date();
    date.setSeconds(0);
    date.setMinutes(0);
    date.setHours(date.getHours() + 1);
    if (date.getTime() < now.getTime()) {
      date.setDate(date.getDate() + 1);
    }
  }

  alarms.create('getBackground', { when: date.getTime() });
}

function onLoad() {
  getBackground();

  setTimeout(() => {
    onAlarm.addListener((alarm) => {
      if (alarm.name === 'getBackground') {
        getBackground();
      }
    });

    createBackgroundAlarm();
  }, 100);
}

onLoad();
