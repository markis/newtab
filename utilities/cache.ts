export interface Cache {
  getItem<T>(key: string): Promise<T>;
  setItem<T>(key: string, value: T): Promise<T>;
}

class cacheImpl implements Cache {
  getItem<T>(key: string): Promise<T> {
    return new Promise((resolve) => {
      resolve(JSON.parse(localStorage.getItem(key)));
    });
  }

  setItem<T>(key: string, value: T): Promise<T> {
    return new Promise((resolve) => {
      localStorage.setItem(key, JSON.stringify(value));
      resolve(value);
    });
  }
}

export var cache = new cacheImpl();
