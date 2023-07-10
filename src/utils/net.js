import axios from 'axios';

const Network = {
  /**
   * @param {string} host
   * @param {number} port
   * @param {string} key
   * @param {boolean} isSecureConnection
   * @param {string} path
   * @returns {Promise}
   * @example
   * Network.get('foo.com', 8080, 'bar', false, 'ping')
   * .then((res) => {
   * console.log(res);
   * })
   * .catch((err) => {
   * console.log(err);
   * });
   **/
  get: (host, port, key, isSecureConnection = false, path) => {
    return axios.get(
      `${isSecureConnection ? 'https' : 'http'}://${host}:${port}/${path}`,
      {
        headers: {
          Authorization: `Bearer ${key}`
        }
      }
    );
  },
  /**
   * @param {string} host
   * @param {number} port
   * @param {string} key
   * @param {boolean} isSecureConnection
   * @param {string} path
   * @param {object} body
   * @returns {Promise}
   * @example
   * Network.post('foo.com', 8080, 'bar', false, 'ping', { foo: 'bar' })
   * .then((res) => {
   * console.log(res);
   * })
   * .catch((err) => {
   * console.log(err);
   * });
   **/
  set: (host, port, key, isSecureConnection = false, path, body) => {
    return axios.post(
      `${isSecureConnection ? 'https' : 'http'}://${host}:${port}/${path}`,
      {
        headers: {
          Authorization: `Bearer ${key}`
        },
        body
      }
    );
  },
  /**
   * @param {string} host
   * @param {number} port
   * @param {boolean} isSecureConnection
   * @returns {Promise}
   * @example
   * Network.get('foo.com', 8080, 'bar', false)
   * .then((res) => {
   *  console.log(res);
   * })
   * .catch((err) => {
   * console.log(err);
   * });
   **/
  ping: (host, port, key, isSecureConnection = false) => {
    return axios.get(
      `${isSecureConnection ? 'https' : 'http'}://${host}:${port}/`,
      {
        headers: {
          Authorization: `Bearer ${key}`
        }
      }
    );
  }
  /**
   * @param {string} host
   * @param {number} port
   * @param {boolean} isSecureConnection
   * @returns {Promise}
   * @example
   * Network.get('foo.com', 8080, 'bar', false)
   * .then((res) => {
   *  console.log(res);
   * })
   * .catch((err) => {
   * console.log(err);
   * });
   **/,
  pingWS: (host, port, key, isSecureConnection = false) => {
    return axios.get(
      `${isSecureConnection ? 'https' : 'http'}://${host}:${port}/ping`,
      {
        headers: {
          Authorization: `Bearer ${key}`
        }
      }
    );
  }
};

export default Network;
