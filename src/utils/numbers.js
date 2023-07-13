/**
 *
 * @param {number} value
 * @returns {number}
 */
const floorDecimal = (number, fractionDigits) => {
  const multiplier = Math.pow(10, fractionDigits);
  let flooredNumber = Math.floor(number * multiplier).toString();

  while (flooredNumber.length < fractionDigits) {
    flooredNumber = '0' + flooredNumber;
  }

  return (
    (flooredNumber.slice(0, -fractionDigits) || 0) +
    '.' +
    flooredNumber.slice(-fractionDigits)
  );
};

export { floorDecimal };
