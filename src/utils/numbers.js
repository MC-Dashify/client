/**
 *
 * @param {number} value
 * @returns {string}
 */
const addCommasToNumbers = (value) => value.toLocaleString();

/**
 *
 * @param {number} value
 * @returns {number}
 */
const floorDecimal = (number, fractionDigits) => {
    const multiplier = Math.pow(10, fractionDigits);
    const flooredNumber = Math.floor(number * multiplier).toString();
    return (flooredNumber.slice(0, -fractionDigits) + '.' + flooredNumber.slice(-fractionDigits));
}

export {
    addCommasToNumbers,
    floorDecimal
};
