import { cache } from './utilities/cache';

function getBackground() {
  fetch('http://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1')
    .then(r => r.json())
    .then(data => cache.setItem('photo', 'http://www.bing.com' + data.images[0].url))
    .then(url => fetch(url))
    // .then(r => r.blob())
    // .then(data => cache.setItem('photo', URL.createObjectURL(data)))
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
      date.setDate(date.getDate()+1);
    }
  }

  chrome.alarms.create('getBackground', { when: date.getTime() })
}


function onLoad() {
  getBackground();

  setTimeout(() => {
    chrome.alarms.onAlarm.addListener((alarm) => {
      if (alarm.name === 'getBackground') {
        getBackground();
      }
      console.log(alarm);
    });

    createBackgroundAlarm();
  }, 100);
}

onLoad();

