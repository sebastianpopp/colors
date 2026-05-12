import colorNames from 'color-name';
import cs from 'color-space';

const COLOR_NAME_ENTRIES = Object.entries(colorNames);
const COLOR_NAME_BY_RGB = new Map(
  COLOR_NAME_ENTRIES.map(([name, rgb]) => [rgb.join(','), name])
);

class Color {
  constructor(r, g, b, a) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }

  static fromHex(hex) {
    const value = hex.replace(/^#/, '').trim();
    const normalizedHex = value.length === 3
      ? value.split('').map(char => char + char).join('')
      : value;
    const parsed = Number.parseInt(normalizedHex, 16);
    const r = (parsed >> 16) & 255;
    const g = (parsed >> 8) & 255;
    const b = parsed & 255;

    return new Color(r, g, b, 1);
  }

  static fromRgb(r, g, b, a = 1) {
    return new Color(r, g, b, a);
  }

  static fromRgbPercent(r, g, b, a = 1) {
    return new Color(
      Math.round(r / 100 * 255),
      Math.round(g / 100 * 255),
      Math.round(b / 100 * 255),
      a
    );
  }

  toName() {
    const rgbKey = [this.r, this.g, this.b].join(',');
    const exactMatch = COLOR_NAME_BY_RGB.get(rgbKey);

    if (typeof exactMatch !== 'undefined') {
      return exactMatch;
    }

    let nearestName = 'black';
    let nearestDistance = Infinity;

    for (const [name, [red, green, blue]] of COLOR_NAME_ENTRIES) {
      const distance = (this.r - red) ** 2 + (this.g - green) ** 2 + (this.b - blue) ** 2;

      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestName = name;
      }
    }

    return nearestName;
  }

  toHex() {
    return '#' + [this.r, this.g, this.b]
      .map(value => value.toString(16).padStart(2, '0').toUpperCase())
      .join('');
  }

  toRgb() {
    return `rgb(${this.r} ${this.g} ${this.b}${this.a === 1 ? '' : ` / ${this.a}`})`;
  }

  toRgbPercent() {
    return `rgb(${Math.round(this.r / 255 * 100)}% ${Math.round(this.g / 255 * 100)}% ${Math.round(this.b / 255 * 100)}%${this.a === 1 ? '' : ` / ${Math.round(this.a * 100)}%`})`;
  }

  toHsl() {
    const [h, s, l] = cs.rgb.hsl([this.r, this.g, this.b]);

    return `hsl(${Math.round(h)} ${Math.round(s)}% ${Math.round(l)}%${this.a === 1 ? '' : ` / ${this.a}`})`;
  }

  toHsv() {
    const [h, s, v] = cs.rgb.hsv([this.r, this.g, this.b]);

    return `hsv(${Math.round(h)} ${Math.round(s)}% ${Math.round(v)}%${this.a === 1 ? '' : ` / ${this.a}`})`;
  }

  toOklch() {
    const [L, a, b_lab] = cs.rgb.oklab([this.r, this.g, this.b]);

    const C = Math.sqrt(a * a + b_lab * b_lab);
    let h = Math.atan2(b_lab, a) * 180 / Math.PI;
    if (h < 0) h += 360;

    const lightness = Math.round(L * 100);
    const chroma = C.toFixed(3);
    const hue = h.toFixed(3);

    return `oklch(${lightness}% ${chroma} ${hue}${this.a === 1 ? '' : ` / ${this.a}`})`;
  }

  toCmyk() {
    const [c, m, y, k] = cs.rgb.cmyk([this.r, this.g, this.b]);

    return `${Math.round(c)}%, ${Math.round(m)}%, ${Math.round(y)}%, ${Math.round(k)}%`;
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
    return this.toRgb();
  }
}

export default Color;
