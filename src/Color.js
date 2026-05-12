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
    return convert.rgb.keyword([this.r, this.g, this.b]);
  }

  toHex() {
    return '#' + convert.rgb.hex(this.r, this.g, this.b);
  }

  toRgb() {
    return `rgb(${this.r} ${this.g} ${this.b}${this.a === 1 ? '' : ` / ${this.a}`})`;
  }

  toRgbPercent() {
    return `rgb(${Math.round(this.r / 255 * 100)}% ${Math.round(this.g / 255 * 100)}% ${Math.round(this.b / 255 * 100)}%${this.a === 1 ? '' : ` / ${Math.round(this.a * 100)}%`})`;
  }

  toHsl() {
    const [h, s, l] = convert.rgb.hsl(this.r, this.g, this.b);

    return `hsl(${h} ${s}% ${l}%${this.a === 1 ? '' : ` / ${this.a}`})`;
  }

  toHsv() {
    const [h, s, v] = convert.rgb.hsv(this.r, this.g, this.b);

    return `hsv(${h} ${s}% ${v}%${this.a === 1 ? '' : ` / ${this.a}`})`;
  }

  toOklch() {
    // Convert RGB to OKLch
    // First, normalize RGB to 0-1
    const r = this.r / 255;
    const g = this.g / 255;
    const b = this.b / 255;

    // Apply inverse sRGB gamma correction
    const rLinear = r <= 0.04045 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
    const gLinear = g <= 0.04045 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
    const bLinear = b <= 0.04045 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);

    // Convert linear RGB to LMS
    const l = 0.4122214708 * rLinear + 0.5291605794 * gLinear + 0.0193738469 * bLinear;
    const m = 0.2119034982 * rLinear + 0.6806995451 * gLinear + 0.1073969566 * bLinear;
    const s = 0.0883024619 * rLinear + 0.2817188376 * gLinear + 0.6299787005 * bLinear;

    // Convert LMS to OKLab
    const lCube = Math.cbrt(l);
    const mCube = Math.cbrt(m);
    const sCube = Math.cbrt(s);

    const L = 0.2104542553 * lCube + 0.7936177850 * mCube - 0.0040720468 * sCube;
    const a = 1.9779984951 * lCube - 2.4285922050 * mCube + 0.4505937099 * sCube;
    const b_lab = 0.0259040371 * lCube + 0.7827717662 * mCube - 0.8086757660 * sCube;

    // Convert OKLab to OKLch
    const C = Math.sqrt(a * a + b_lab * b_lab);
    let h = Math.atan2(b_lab, a) * 180 / Math.PI;
    if (h < 0) h += 360;

    // Format values
    const lightness = Math.round(L * 100);
    const chroma = C.toFixed(3);
    const hue = h.toFixed(3);

    return `oklch(${lightness}% ${chroma} ${hue}${this.a === 1 ? '' : ` / ${this.a}`})`;
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
    return this.toRgb();
  }
}

export default Color;
