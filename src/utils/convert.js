/**
 *
 * @param {string} str format: "100 Bytes", "100 KB", "100 MB", "100 GB", "100 TB" etc
 * @returns {number} bytes
 * @example
 * stringToBytes('100 Bytes') // 100
 * stringToBytes('100 KB') // 102400
 * stringToBytes('100 MB') // 104857600
 * stringToBytes('100 GB') // 107374182400
 * stringToBytes('100 TB') // 109951162777600
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
