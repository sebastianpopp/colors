import cs from 'color-space';
import cp from 'color-parse';
import cn from 'color-namer';

class Color {
  constructor(space, values, alpha = 1) {
    this.space = space;
    this.values = values;
    this.a = alpha;
  }

  static fromString(colorString) {
    try {
      let parsed = cp(colorString);

      if (parsed.space === undefined) {
        parsed = cp('#' + colorString);
      }

      if (parsed.space === undefined) {
        return null;
      }

      return new Color(parsed.space, parsed.values, parsed.alpha);
    } catch (e) {
      return null;
    }
  }

  static fromRgb(r, g, b, a = 1) {
    return new Color('rgb', [r, g, b], a);
  }

  _convertSpace(targetSpace) {
    if (this.space === targetSpace) {
      return this;
    }

    return new Color(targetSpace, cs[this.space][targetSpace](this.values), this.a);
  }

  toName() {
    return cn(this.toHex(), { pick: ['ntc'] }).ntc[0].name;
  }

  toHtmlName() {
    return cn(this.toHex(), { pick: ['html'] }).html[0].name;
  }

  toHex() {
    const [r, g, b] = this._convertSpace('rgb').values;

    return '#' + [r, g, b]
      .map(value => value.toString(16).padStart(2, '0').toUpperCase())
      .join('') + (this.a < 1 ? Math.round(this.a * 255).toString(16).padStart(2, '0').toUpperCase() : '');
  }

  toRgb() {
    const [r, g, b] = this._convertSpace('rgb').values;

    return `rgb(${r} ${g} ${b}${this.a === 1 ? '' : ` / ${this.a}`})`;
  }

  toRgbPercent() {
    const [r, g, b] = this._convertSpace('rgb').values;

    return `rgb(${Math.round(r / 255 * 100)}% ${Math.round(g / 255 * 100)}% ${Math.round(b / 255 * 100)}%${this.a === 1 ? '' : ` / ${Math.round(this.a * 100)}%`})`;
  }

  toHsl() {
    const [h, s, l] = this._convertSpace('hsl').values;

    return `hsl(${Math.round(h)} ${Math.round(s)}% ${Math.round(l)}%${this.a === 1 ? '' : ` / ${this.a}`})`;
  }

  toHsv() {
    const [h, s, v] = this._convertSpace('hsv').values;

    return `hsv(${Math.round(h)} ${Math.round(s)}% ${Math.round(v)}%${this.a === 1 ? '' : ` / ${this.a}`})`;
  }

  toOklch() {
    const [L, a, b_lab] = this._convertSpace('oklab').values;

    const C = Math.sqrt(a * a + b_lab * b_lab);
    let h = Math.atan2(b_lab, a) * 180 / Math.PI;
    if (h < 0) h += 360;

    const lightness = Math.round(L * 100);
    const chroma = C.toFixed(3);
    const hue = h.toFixed(3);

    return `oklch(${lightness}% ${chroma} ${hue}${this.a === 1 ? '' : ` / ${this.a}`})`;
  }

  toCmyk() {
    const [c, m, y, k] = this._convertSpace('cmyk').values;

    return `${Math.round(c)}%, ${Math.round(m)}%, ${Math.round(y)}%, ${Math.round(k)}%`;
  }

  toSwift() {
    const [r, g, b] = this._convertSpace('rgb').values.map(v => (v / 255).toFixed(2));
    const a = this.a.toFixed(2);

    return `UIColor(red: ${r}, green: ${g}, blue: ${b}, alpha: ${a})`;
  }

  toObjc() {
    const [r, g, b] = this._convertSpace('rgb').values.map(v => (v / 255).toFixed(2));
    const a = this.a.toFixed(2);

    return `[UIColor colorWithRed:${r} green:${g} blue:${b} alpha:${a}]`;
  }

  toString() {
    return this.toRgb();
  }
}

export default Color;
