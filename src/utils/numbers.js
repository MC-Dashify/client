/**
 *
 * @param {number} value
 * @returns {number}
 * @example
 * floorDecimal(1.2345, 2) // 1.23
 * floorDecimal(1.2345, 3) // 1.234
 * floorDecimal(1.2345, 4) // 1.2345
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
