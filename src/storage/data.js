const data = {
  /**
   * Get data from localStorage
   * key is the name of the key to get like ("foo") or ("foo.bar")
   * @param {string} key
   * @returns {string | null}
   */
  get: (key) => {
    const _temp = localStorage.getItem(key);
    return _temp === null || _temp === ''
      ? null
      : decodeURIComponent(atob(_temp));
  },
  /**
   * Set data to localStorage
   * key is the name of the key to get like ("foo") or ("foo.bar")
   * value is the value to set
   * @param {string} key
   * @param {any} value
   */
  set: (key, value) => {
    localStorage.setItem(
      key,
      value === null ? '' : btoa(encodeURIComponent(`${value}`))
    );
  },
  /**
   * Delete data from localStorage
   * key is the name of the key to get like ("foo") or ("foo.bar")
   * @param {string} key
   */
  delete: (key) => {
    localStorage.removeItem(key);
  }
};

export default data;
