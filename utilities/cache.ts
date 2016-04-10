declare var require: any;
const localforage: LocalForage = require('localforage/dist/localforage.nopromises');

export interface Cache {
  getItem<T>(key: string): Promise<T>;
  setItem<T>(key: string, value: T): Promise<T>;
}

export var cache: Cache = localforage.createInstance({
  name: 'newtab',
  storeName: 'data'
});
