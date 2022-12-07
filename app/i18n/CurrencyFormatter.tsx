import * as RNLocalize from 'react-native-localize';

class CurrencyFormatter {
  static instance: CurrencyFormatter;
  private _decimal: any;
  private _thousands: any;
  private _locale: any;
  constructor() {
    if (!CurrencyFormatter.instance) {
      CurrencyFormatter.instance = this;
    }
    // Initialize object
    this.init();
    return CurrencyFormatter.instance;
  }
  // Properties & Methods

  init() {
    const locales = RNLocalize.getLocales();
    if (locales.length > 0) {
      const locale = locales[0];
      this.locale = locale.languageCode;
      return;
    }
    this.locale = 'id';
  }

  get decimal() {
    return this._decimal;
  }

  get thousands() {
    return this._thousands;
  }

  get locale() {
    return this._locale;
  }

  set locale(newLocale) {
    if (this._locale === newLocale) {
      return;
    }
    this._locale = newLocale;
    this._thousands = '.';
    this._decimal = (0.1)
      .toLocaleString(this._locale, {minimumFractionDigits: 2})
      .slice(1, 2);
    switch (this._decimal) {
      case ',':
        this._thousands = '.';
        break;
      case '.':
        this._thousands = ',';
        break;
    }
  }

  // Turn text into number support negative, and locale aware
  numbersFromText(text = '') {
    if (text.length === 0) {
      return [0];
    }
    text = text.replace(/[^0-9,.-]/gm, '');
    let decimal = 0;
    let is_negatve = false;
    if (text[0] === '-') {
      is_negatve = true;
      text = text.replace(/[\-]/gm, '');
    }
    if (text.indexOf(this.decimal) > -1) {
      const texts = text.split(this.decimal); // split main number with it decimal part
      const decimal_string = texts
        .slice(1) // remove the main number part
        .join('') // combine all string
        .replace(new RegExp(`[\\${this.thousands}\\-]`, 'gm'), '') // remove any unnecesary part
        .slice(0, 2); // only accept two decimals
      decimal = Number(decimal_string);
      text = texts[0];
    }
    // Remove all unnecesary symbols we will reconfigure it
    text = text.replace(/[\,\.\-]/gm, '');
    let base = Number(text);
    if (is_negatve) {
      base *= -1;
    }
    if (decimal > 0) {
      return [base, decimal];
    }
    return [base];
  }

  // Turn text into number support negative, and locale aware
  numbersFromNumber(number = 0) {
    if (Number.isInteger(number)) {
      return [number];
    }
    const text = number.toString().split('.');
    const base = Number(text[0]);
    const decimal = Number(text[1].slice(0, 2));
    if (decimal > 0) {
      return [base, decimal];
    }
    return [base];
  }

  formatNumber(
    number: string | number | null | undefined,
    formatNegative = false,
  ) {
    if (number === '0' || number === 0) {
      return '0';
    }

    if (!number) {
      return '';
    }

    let numbers = [0];
    if (typeof number === 'number') {
      numbers = this.numbersFromNumber(number);
    } else if (typeof number === 'string') {
      numbers = this.numbersFromText(number);
    }

    numbers[0] = Number(
      numbers[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, this.thousands),
    );
    if (formatNegative) {
      if (numbers[0] < 0) {
        numbers[0] = Math.abs(numbers[0]);
        return `(${numbers.map(_ => _.toString()).join(this.decimal)})`;
      }
    }
    return numbers.map(_ => _.toString()).join(this.decimal);
  }

  numberFromText(text = '') {
    if (!text) {
      return 0;
    }
    if (typeof text === 'number') {
      return text;
    }
    const numbers = this.numbersFromText(text);
    if (numbers.length > 1) {
      return numbers[0] + numbers[1] / 100;
    }
    return numbers[0];
  }

  sanitizeCurrencyInput(text = '') {
    text = text.replace(/[^0-9\,\.\-]/gm, ''); // don't allow any other symbols
    let is_negative = false;
    if (text[0] === '-') {
      is_negative = true;
    }
    text = text.replace(/[\-]/gm, ''); // remove all negative symbols
    let decimal_text = '';
    let has_decimal = false;
    // get decimal part
    if (text.indexOf(this.decimal) > -1) {
      has_decimal = true;
      decimal_text = text.split(this.decimal)[1].slice(0, 2); // only accept two decimals
      text = text.split(this.decimal)[0];
    }
    // Remove all thousands separator we will reconfigure it
    text = text.replace(this.thousands, '');
    text = this.formatNumber(text);
    if (is_negative) {
      text = `-${text}`;
    }
    // recombine with decimals
    text = has_decimal ? `${text}${this.decimal}${decimal_text}` : text;
    return text;
  }
}

const instance = new CurrencyFormatter();

export default instance;
