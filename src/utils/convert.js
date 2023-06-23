/**
 *
 * @param {string} str format: "100 Bytes", "100 KB", "100 MB", "100 GB", "100 TB" etc
 * @returns {number} bytes
 */
const stringToBytes = (str) => {
  const [number, unit] = str.split(' ');
  const bytes = Number(number);

  switch (unit) {
    case 'Bytes':
      return bytes;

    case 'KB':
      return bytes * 1024;

    case 'MB':
      return bytes * 1024 ** 2;

    case 'GB':
      return bytes * 1024 ** 3;

    case 'TB':
      return bytes * 1024 ** 4;

    default:
      return 0;
  }
};

export { stringToBytes };
