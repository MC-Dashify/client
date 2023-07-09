import axios from 'axios';

const Network = {
  /**
   * @param {string} host
   * @param {number} port
   * @param {boolean} isSecureConnection
   * @returns {Promise}
   * @example
   * Network.ping('foo.com', 25565, false)
   * .then((res) => {
   *  console.log(res);
   * })
   * .catch((err) => {
   * console.log(err);
   * });
   **/
  ping: (host, port, key, isSecureConnection = false) => {
    return axios.get(
      // `${isSecureConnection ? 'https' : 'http'}://${host}:${port}/ping`,
      '/ping',
      {
        headers: {
          Authorization: `Bearer ${key}`
        }
      }
    );
  }
};

export default Network;
