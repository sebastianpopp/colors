import Color from './Color';

class ColorParser {
  constructor(query) {
    this.query = query.toLowerCase();
    this.colors = [];

    this._parse();
  }

  isColor() {
    return this.colors.length > 0;
  }

  getColor() {
    return this.isColor()
      ? this.colors[0]
      : null;
  }

  _parse() {
    this._parseHtmlColor();
    this._parseHex();
    this._parseRgbValues();
    this._parseRgbPercent();
  }

  _parseHtmlColor() {
    const colors = require('./html_colors.json');

    if (typeof colors[this.query] !== 'undefined') {
      this.colors.push(Color.fromHex(colors[this.query]));
    }
  }

  _parseHex() {
    const regex = /^#?(([a-f\d]{3})([a-f\d]{3})?)$/i;

    if (regex.test(this.query)) {
      const hex = this.query.match(regex)[1];

      this.colors.push(Color.fromHex(hex));
    }
  }

  _parseRgbValues() {
    const regex = /^r?g?b?\s*\(?(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\)?$/;

    if (regex.test(this.query)) {
      const rgb = this.query.match(regex);

      const [r, g, b] = rgb.slice(1).map(n => parseInt(n, 10));

      if (r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255) {
        this.colors.push(Color.fromRgb(r, g, b));
      }
    }
  }
  
  _parseRgbPercent() {
    const regex = /^r?g?b?\s*\(?\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)?$/;

    if (regex.test(this.query)) {
      const rgb = this.query.match(regex);

      const [r, g, b] = rgb.slice(1).map(n => parseInt(n, 10));

      if (r >= 0 && r <= 100 && g >= 0 && g <= 100 && b >= 0 && b <= 100) {
        this.colors.push(Color.fromRgbPercent(r, g, b));
      }
    }
  }
}

export default ColorParser;
