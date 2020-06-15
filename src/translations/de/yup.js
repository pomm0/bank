import { formatDate } from 'utils/intl';

export default {
  mixed: {
    default: 'Dies ist kein gültiger Wert',
    required: 'Dies ist ein Pflichtfeld',
    notType: 'Dies ist kein gültiger Wert'
  },
  number: {
    positive: 'Wert muss größer als 0 sein'
  },
  date: {
    min: (min) => `Das Datum muss größer sein als "${formatDate(min.value)}"`
  }
};
