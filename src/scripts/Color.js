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

  toName() {
    return convert.rgb.keyword([this.r, this.g, this.b]);
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

  toHsv() {
    const [h, s, v] = convert.rgb.hsv(this.r, this.g, this.b);

    return `hsv(${h}, ${s}%, ${v}%)`;
  }

  toCmyk() {
    const [c, m, y, k] = convert.rgb.cmyk(this.r, this.g, this.b);

    return `${c}%, ${m}%, ${y}%, ${k}%`;
  }

  toSwift() {
    const [r, g, b] = [this.r, this.g, this.b].map(v => (v / 255).toFixed(2));
    const a = this.a.toFixed(2);

    return `UIColor(red: ${r}, green: ${g}, blue: ${b}, alpha: ${a})`;
  }

  toObjc() {
    const [r, g, b] = [this.r, this.g, this.b].map(v => (v / 255).toFixed(2));
    const a = this.a.toFixed(2);

    return `[UIColor colorWithRed:${r} green:${g} blue:${b} alpha:${a}]`;
  }

  toString() {
    return this.toRgba();
  }
}

export default Color;
