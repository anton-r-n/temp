(function (w) {
  var $ = (w.$ = w.$ || {}),
    days = 'Sun Mon Tue Wed Thu Fri Sat'.split(' '),
    abbrs = 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(' '),
    months = (
      'January February March April May June July August September ' +
      'October November December'
    ).split(' ');

  var preset = {
    ISO: '%Y-%m-%dT%H:%M:%S%z',
    US: '%m/%d/%Y %H:%M',
    D: '%m/%d/%Y',
    X: '%h %m %s',
    DT: '%Y-%m-%d-%H-%M',
  };

  /**
   * Format UTC date with time zone offset
   * @param {Object} date Date or timestamp in ms.
   * @param {String} format Date format, default ISO.
   * @param {Number} tz Time zone fixed offset in minutes.
   * @return {String} formatted date.
   */
  $.tzformat = function (date, format, tz) {
    format = preset[format] || format;

    date = date instanceof Date ? date : new Date(date);
    format = typeof format === 'string' ? format : '%Y-%m-%dT%H:%M:%S%z';
    tz = typeof tz === 'number' ? tz : date.getTimezoneOffset();

    var D = new Date(date - tz * 6e4);

    return format.replace(/%(\w)/g, function ($0, $1) {
      switch ($1) {
        case 'B':
          return months[D.getUTCMonth()];
        case 'H':
          return pad(D.getUTCHours());
        case 'M':
          return pad(D.getUTCMinutes());
        case 'S':
          return pad(D.getUTCSeconds());
        case 'Y':
          return D.getUTCFullYear();
        case 'a':
          return days[D.getUTCDay()];
        case 'b':
          return abbrs[D.getUTCMonth()];
        case 'd':
          return pad(D.getUTCDate());
        case 'm':
          return pad(D.getUTCMonth() + 1);
        case 'y':
          return ('' + D.getUTCFullYear()).slice(-2);
        case 'z':
          if (tz === 0) {
            return 'Z';
          } else {
            return [
              tz > 0 ? '+' : '-',
              pad(Math.abs(Math.round(tz / 60))),
              ':',
              pad(Math.abs(Math.round(tz % 60))),
            ].join('');
          }
          break;
        default:
          return '';
      }
    });
  };

  function pad(n) {
    return (n < 10 ? '0' : '') + n;
  }
})(this);
