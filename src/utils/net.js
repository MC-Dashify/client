import axios from 'axios';

const Network = {
  ping: (host, port, isSecureConnection = false) => {
    return axios.get(
      `${isSecureConnection ? 'https' : 'http'}://${host}:${port}/ping`
    );
  }
};

export default Network;
