import convert from 'color-convert';

class Color {
  constructor(r, g, b, a) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }

  static fromHex(hex) {
    const [r, g, b] = convert.hex.rgb(hex);
    return new Color(r, g, b, 1);
  }

  static fromRgb(r, g, b) {
    return new Color(r, g, b, 1);
  }

  static fromRgbPercent(r, g, b) {
    return new Color(
      Math.round(r / 100 * 255),
      Math.round(g / 100 * 255),
      Math.round(b / 100 * 255),
      1
    );
  }

  toHex() {
    return '#' + convert.rgb.hex(this.r, this.g, this.b);
  }

  toRgb() {
    return `rgb(${this.r}, ${this.g}, ${this.b})`;
  }

  toRgba() {
    return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
  }

  toRgbPercent() {
    return `rgb(${Math.round(this.r / 255 * 100)}%, ${Math.round(this.g / 255 * 100)}%, ${Math.round(this.b / 255 * 100)}%)`;
  }

  toHsl() {
    const [h, s, l] = convert.rgb.hsl(this.r, this.g, this.b);
    
    return `hsl(${h}, ${s}%, ${l}%)`;
  }

  toString() {
    return this.toRgba();
  }
}

export default Color;
