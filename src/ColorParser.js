import Color from './Color.js';
import colors from 'color-name';

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
    if (typeof colors[this.query] !== 'undefined') {
      this.colors.push(Color.fromRgb(...colors[this.query]));
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
    const regex = /^r?g?b?\s*\(?\s*(\d{1,3})\s*(?:,\s*|\s+)(\d{1,3})\s*(?:,\s*|\s+)(\d{1,3})(?:\s*\/\s*(\d{1,3}(?:\.\d+)?%?))?\s*\)?$/;

    if (regex.test(this.query)) {
      const rgb = this.query.match(regex);
      const [r, g, b] = rgb.slice(1, 4).map(n => parseInt(n, 10));
      const alpha = this._parseAlpha(rgb[4]);

      if (alpha !== null && r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255) {
        this.colors.push(Color.fromRgb(r, g, b, alpha));
      }
    }
  }

  _parseAlpha(alpha) {
    if (typeof alpha === 'undefined') {
      return 1;
    }

    if (alpha.endsWith('%')) {
      const value = parseFloat(alpha);

      return value >= 0 && value <= 100
        ? value / 100
        : null;
    }

    const value = parseFloat(alpha);

    return value >= 0 && value <= 1
      ? value
      : null;
  }

  _parseRgbPercent() {
    const regex = /^r?g?b?\s*\(?\s*(\d{1,3})%\s*(?:,\s*|\s+)(\d{1,3})%\s*(?:,\s*|\s+)(\d{1,3})%(?:\s*\/\s*(\d{1,3}(?:\.\d+)?%?))?\s*\)?$/;

    if (regex.test(this.query)) {
      const rgb = this.query.match(regex);
      const [r, g, b] = rgb.slice(1, 4).map(n => parseInt(n, 10));
      const alpha = this._parseAlpha(rgb[4]);

      if (alpha !== null && r >= 0 && r <= 100 && g >= 0 && g <= 100 && b >= 0 && b <= 100) {
        this.colors.push(Color.fromRgbPercent(r, g, b, alpha));
      }
    }
  }
}

export default ColorParser;
