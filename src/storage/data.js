import { Store } from 'tauri-plugin-store-api';

const store = new Store('dashify.dat');

const AppData = {
  /**
   * Get data from localStorage
   * key is the name of the key to get like ("foo") or ("foo.bar")
   * @param {string} key
   * @returns {string | null}
   * @example
   * AppData.get('foo')
   * // returns "bar"
   * AppData.get('foo.bar')
   * // returns "baz"
   * AppData.get('foo.baz')
   * // returns null
   */
  get: (key) => {
    const _temp = localStorage.getItem(key);

    return _temp === null || _temp === ''
      ? null
      : JSON.parse(decodeURIComponent(atob(_temp)));
  },

  /**
   * Set data to localStorage
   * key is the name of the key to get like ("foo") or ("foo.bar")
   * value is the value to set
   * @param {string} key
   * @param {any} value
   * @returns {void}
   * @example
   * AppData.set('foo', 'bar')
   * AppData.set('foo.bar', 'baz')
   */
  set: (key, value) => {
    localStorage.setItem(
      key,
      value === null ? '' : btoa(encodeURIComponent(JSON.stringify(value)))
    );
  },

  /**
   * Delete data from localStorage
   * key is the name of the key to get like ("foo") or ("foo.bar")
   * @param {string} key
   * @returns {void}
   * @example
   * AppData.delete('foo')
   * AppData.delete('foo.bar')
   */
  delete: (key) => {
    localStorage.removeItem(key);
  },

  /**
   * Delete all data from localStorage
   * @returns {void}
   * @example
   * AppData.clear()
   * // clears all data from localStorage
   */
  clear: () => {
    Object.keys(localStorage).forEach(async (key) => {
      await localStorage.removeItem(key);
      const { hostname, port } = window.location;
      if (!(hostname === 'localhost' && port === '5173')) {
        await store.delete(key);
      }
    });
  }
};

export default AppData;
