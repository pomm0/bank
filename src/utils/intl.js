/**
 * Formats given number into a intl number format
 *
 * @param {Number} number The number to format
 * @param {Object} options Intl.NumberFormats options
 */
export const formatCurrency = (number, options = {}) => {
  if (!number || typeof number !== 'number') {
    return number;
  }

  return new Intl.NumberFormat(
    'de-CH',
    Object.assign({ style: 'currency', currency: 'CHF' }, options)
  ).format(number);
};

/**
 * Formats given date into a intl DateTime format
 *
 * @param {Date} date The date to format
 * @param {Object} options Intl.DateTimeFormat options
 */
export const formatDate = (date, options) => {
  if (!(date instanceof Date)) {
    return date;
  }

  return new Intl.DateTimeFormat('de-CH', Object.assign({}, options)).format(date);
};
