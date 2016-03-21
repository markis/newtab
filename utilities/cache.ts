declare var require: any;
const localforage: LocalForage = require('localforage/dist/localforage.nopromises');

export var cache = localforage.createInstance({
  name: 'newtab',
  storeName: 'data'
});
