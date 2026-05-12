import { describe, it, expect } from 'vitest';
import Color from './Color.js';

describe('Color', () => {
  describe('fromString', () => {
    describe('html color names', () => {
      it('parses red', () => {
        const color = Color.fromString('red');
        expect(color).toEqual(Color.fromRgb(255, 0, 0, 1));
      });

      it('parses green', () => {
        const color = Color.fromString('green');
        expect(color).toEqual(Color.fromRgb(0, 128, 0, 1));
      });

      it('parses BlueViolet', () => {
        const color = Color.fromString('BlueViolet');
        expect(color).toEqual(Color.fromRgb(138, 43, 226, 1));
      });
    });

    describe('hex colors', () => {
      it('parses 6-digit hex colors', () => {
        expect(Color.fromString('#FF0000')).toEqual(Color.fromRgb(255, 0, 0, 1));
        expect(Color.fromString('#00FF00')).toEqual(Color.fromRgb(0, 255, 0, 1));
        expect(Color.fromString('#0000FF')).toEqual(Color.fromRgb(0, 0, 255, 1));
      });

      it('parses 3-digit hex colors', () => {
        expect(Color.fromString('#eee')).toEqual(Color.fromRgb(238, 238, 238, 1));
        expect(Color.fromString('#F00')).toEqual(Color.fromRgb(255, 0, 0, 1));
      });

      it('parses hex colors without hash', () => {
        expect(Color.fromString('FF0000')).toEqual(Color.fromRgb(255, 0, 0, 1));
        expect(Color.fromString('00FF00')).toEqual(Color.fromRgb(0, 255, 0, 1));
        expect(Color.fromString('0000FF')).toEqual(Color.fromRgb(0, 0, 255, 1));
        expect(Color.fromString('eee')).toEqual(Color.fromRgb(238, 238, 238, 1));
      });

      it('handles lowercase hex colors', () => {
        const color = Color.fromString('ff00ff');
        expect(color).toEqual(Color.fromRgb(255, 0, 255, 1));
      });

      it('handles mixed case hex colors', () => {
        const color = Color.fromString('AbCdEf');
        expect(color).toEqual(Color.fromRgb(171, 205, 239, 1));
      });
    });

    describe('rgb colors', () => {
      it('parses rgb colors with comma separation', () => {
        expect(Color.fromString('rgb(255, 0, 0)')).toEqual(Color.fromRgb(255, 0, 0, 1));
        expect(Color.fromString('rgb(0, 255, 0)')).toEqual(Color.fromRgb(0, 255, 0, 1));
        expect(Color.fromString('rgb(0, 0, 255)')).toEqual(Color.fromRgb(0, 0, 255, 1));
      });

      it('parses rgb colors with space separation', () => {
        expect(Color.fromString('rgb(255 0 0)')).toEqual(Color.fromRgb(255, 0, 0, 1));
        expect(Color.fromString('rgb(13 148 136)')).toEqual(Color.fromRgb(13, 148, 136, 1));
      });

      it('parses rgb with alpha channel', () => {
        expect(Color.fromString('rgb(13 148 136 / 0.5)')).toEqual(Color.fromRgb(13, 148, 136, 0.5));
        expect(Color.fromString('rgba(255, 0, 0, 0.5)')).toEqual(Color.fromRgb(255, 0, 0, 0.5));
      });

      it('parses rgb with alpha percentage', () => {
        expect(Color.fromString('rgb(13 148 136 / 50%)')).toEqual(Color.fromRgb(13, 148, 136, 0.5));
      });

      it('parses incomplete rgb format', () => {
        expect(Color.fromString('123, 234, 0')).toEqual(Color.fromRgb(123, 234, 0, 1));
        expect(Color.fromString('123 234 0')).toEqual(Color.fromRgb(123, 234, 0, 1));
        expect(Color.fromString('rgb(0, 0, 255')).toEqual(Color.fromRgb(0, 0, 255, 1));
      });
    });

    describe('rgb percent colors', () => {
      it('parses rgb percent with comma separation', () => {
        expect(Color.fromString('rgb(100%, 0%, 0%)')).toEqual(Color.fromRgb(255, 0, 0, 1));
        expect(Color.fromString('rgb(0%, 100%, 0%)')).toEqual(Color.fromRgb(0, 255, 0, 1));
        expect(Color.fromString('rgb(0%, 0%, 100%)')).toEqual(Color.fromRgb(0, 0, 255, 1));
      });

      it('parses rgb percent with space separation', () => {
        expect(Color.fromString('rgb(13% 48% 36%)')).toEqual(Color.fromRgb(33.15, 122.39999999999999, 91.8, 1));
      });

      it('parses rgb percent with alpha channel', () => {
        expect(Color.fromString('rgb(13% 48% 36% / 0.5)')).toEqual(Color.fromRgb(33.15, 122.39999999999999, 91.8, 0.5));
      });

      it('parses rgb percent with alpha percentage', () => {
        expect(Color.fromString('rgb(13% 48% 36% / 50%)')).toEqual(Color.fromRgb(33.15, 122.39999999999999, 91.8, 0.5));
      });
    });

    describe('hsl colors', () => {
      it('parses hsl colors', () => {
        const color = Color.fromString('hsl(0, 100%, 50%)');
        expect(color.toRgb()).toBe('rgb(255 0 0)');
      });

      it('parses hsl space-separated', () => {
        const color = Color.fromString('hsl(0 100% 50%)');
        expect(color.toRgb()).toBe('rgb(255 0 0)');
      });
    });

    describe('hsv colors', () => {
      it('parses hsv colors', () => {
        const color = Color.fromString('hsv(0, 100%, 100%)');
        expect(color.toRgb()).toBe('rgb(255 0 0)');
      });

      it('parses hsv space-separated', () => {
        const color = Color.fromString('hsv(0 100% 100%)');
        expect(color.toRgb()).toBe('rgb(255 0 0)');
      });
    });
  });

  describe('fromRgb', () => {
    it('creates a Color from RGB values', () => {
      const color = Color.fromRgb(128, 64, 32);
      expect(color.toRgb()).toBe('rgb(128 64 32)');
    });

    it('creates black color', () => {
      const color = Color.fromRgb(0, 0, 0);
      expect(color.toRgb()).toBe('rgb(0 0 0)');
    });

    it('creates white color', () => {
      const color = Color.fromRgb(255, 255, 255);
      expect(color.toRgb()).toBe('rgb(255 255 255)');
    });
  });

  describe('toHtmlName', () => {
    it('converts red color to name', () => {
      const color = Color.fromRgb(255, 0, 0);
      expect(color.toHtmlName()).toBe('red');
    });

    it('converts green color to name', () => {
      const color = Color.fromRgb(0, 128, 0);
      expect(color.toHtmlName()).toBe('green');
    });

    it('converts blue color to name', () => {
      const color = Color.fromRgb(0, 0, 255);
      expect(color.toHtmlName()).toBe('blue');
    });
  });

  describe('toHex', () => {
    it('converts color to uppercase hex with # prefix', () => {
      const color = Color.fromRgb(255, 0, 0);
      expect(color.toHex()).toBe('#FF0000');
    });

    it('converts to 6-digit hex format', () => {
      const color = Color.fromRgb(100, 150, 200);
      expect(color.toHex()).toMatch(/^#[0-9A-F]{6}$/);
    });

    it('converts black to #000000', () => {
      const color = Color.fromRgb(0, 0, 0);
      expect(color.toHex()).toBe('#000000');
    });

    it('converts white to #FFFFFF', () => {
      const color = Color.fromRgb(255, 255, 255);
      expect(color.toHex()).toBe('#FFFFFF');
    });

    it('rounds non rgb values and converts to hex', () => {
      const color = Color.fromString('rgb(98% 50% 45%)');
      expect(color.toHex()).toBe('#FA8073');
    });
  });

  describe('toRgb', () => {
    it('converts to rgb() format', () => {
      const color = Color.fromRgb(255, 0, 0);
      expect(color.toRgb()).toBe('rgb(255 0 0)');
    });

    it('formats RGB values as space-separated integers', () => {
      const color = Color.fromRgb(100, 150, 200);
      expect(color.toRgb()).toBe('rgb(100 150 200)');
    });

    it('converts black', () => {
      const color = Color.fromRgb(0, 0, 0);
      expect(color.toRgb()).toBe('rgb(0 0 0)');
    });

    it('includes alpha channel', () => {
      const color = Color.fromRgb(100, 150, 200, 0.5);
      expect(color.toRgb()).toBe('rgb(100 150 200 / 0.5)');
    });

    it('handles alpha value of 0', () => {
      const color = Color.fromRgb(255, 0, 0, 0);
      expect(color.toRgb()).toBe('rgb(255 0 0 / 0)');
    });
  });

  describe('toRgbPercent', () => {
    it('converts RGB to percentage format', () => {
      const color = Color.fromRgb(255, 0, 0);
      expect(color.toRgbPercent()).toBe('rgb(100% 0% 0%)');
    });

    it('converts 128 to 50%', () => {
      const color = Color.fromRgb(128, 128, 128);
      expect(color.toRgbPercent()).toBe('rgb(50% 50% 50%)');
    });

    it('converts black', () => {
      const color = Color.fromRgb(0, 0, 0);
      expect(color.toRgbPercent()).toBe('rgb(0% 0% 0%)');
    });

    it('converts white', () => {
      const color = Color.fromRgb(255, 255, 255);
      expect(color.toRgbPercent()).toBe('rgb(100% 100% 100%)');
    });

    it('includes alpha channel', () => {
      const color = Color.fromRgb(100, 150, 200, 0.5);
      expect(color.toRgbPercent()).toBe('rgb(39% 59% 78% / 50%)');
    });
  });

  describe('toHsl', () => {
    it('converts to HSL format', () => {
      const color = Color.fromRgb(255, 0, 0);
      expect(color.toHsl()).toBe('hsl(0 100% 50%)');
    });

    it('converts green to HSL', () => {
      const color = Color.fromRgb(0, 255, 0);
      expect(color.toHsl()).toBe('hsl(120 100% 50%)');
    });

    it('converts blue to HSL', () => {
      const color = Color.fromRgb(0, 0, 255);
      expect(color.toHsl()).toBe('hsl(240 100% 50%)');
    });

    it('converts gray', () => {
      const color = Color.fromRgb(128, 128, 128);
      const hsl = color.toHsl();
      expect(color.toHsl()).toBe('hsl(0 0% 50%)');
    });

    it('includes alpha channel', () => {
      const color = Color.fromRgb(100, 150, 200, 0.5);
      expect(color.toHsl()).toBe('hsl(210 48% 59% / 0.5)');
    });
  });

  describe('toHsv', () => {
    it('converts to HSV format', () => {
      const color = Color.fromRgb(255, 0, 0);
      expect(color.toHsv()).toBe('hsv(0 100% 100%)');
    });

    it('converts green to HSV', () => {
      const color = Color.fromRgb(0, 255, 0);
      expect(color.toHsv()).toBe('hsv(120 100% 100%)');
    });

    it('converts blue to HSV', () => {
      const color = Color.fromRgb(0, 0, 255);
      expect(color.toHsv()).toBe('hsv(240 100% 100%)');
    });

    it('includes alpha channel', () => {
      const color = Color.fromRgb(100, 150, 200, 0.5);
      expect(color.toHsv()).toBe('hsv(210 50% 78% / 0.5)');
    });
  });

  describe('toOklch', () => {
    it('converts to OKLch format', () => {
      const color = Color.fromRgb(13, 148, 136);
      expect(color.toOklch()).toBe('oklch(76% 0.115 189.733)');
    });

    it('converts red to OKLch', () => {
      const color = Color.fromRgb(255, 0, 0);
      expect(color.toOklch()).toBe('oklch(63% 0.258 29.234)');
    });

    it('includes alpha channel', () => {
      const color = Color.fromRgb(13, 148, 136, 0.5);
      expect(color.toOklch()).toBe('oklch(76% 0.115 189.733 / 0.5)');
    });

    it('includes alpha channel for white', () => {
      const color = Color.fromRgb(255, 255, 255, 0.5);
      expect(color.toOklch()).toBe('oklch(100% 0.000 89.876 / 0.5)');
    });
  });

  describe('toCmyk', () => {
    it('converts to CMYK format', () => {
      const color = Color.fromRgb(255, 0, 0);
      expect(color.toCmyk()).toBe('0%, 100%, 100%, 0%');
    });

    it('converts green to CMYK', () => {
      const color = Color.fromRgb(0, 255, 0);
      expect(color.toCmyk()).toBe('100%, 0%, 100%, 0%');
    });

    it('converts blue to CMYK', () => {
      const color = Color.fromRgb(0, 0, 255);
      expect(color.toCmyk()).toBe('100%, 100%, 0%, 0%');
    });

    it('converts black to CMYK', () => {
      const color = Color.fromRgb(0, 0, 0);
      expect(color.toCmyk()).toBe('0%, 0%, 0%, 100%');
    });
  });

  describe('toSwift', () => {
    it('converts to Swift UIColor format', () => {
      const color = Color.fromRgb(255, 0, 0);
      expect(color.toSwift()).toBe('UIColor(red: 1.00, green: 0.00, blue: 0.00, alpha: 1.00)');
    });

    it('includes alpha channel in Swift format', () => {
      const color = Color.fromRgb(128, 128, 128, 0.5);
      expect(color.toSwift()).toBe('UIColor(red: 0.50, green: 0.50, blue: 0.50, alpha: 0.50)');
    });

    it('converts black to Swift format', () => {
      const color = Color.fromRgb(0, 0, 0);
      expect(color.toSwift()).toBe('UIColor(red: 0.00, green: 0.00, blue: 0.00, alpha: 1.00)');
    });

    it('formats values to 2 decimal places', () => {
      const color = Color.fromRgb(100, 150, 200);
      const swift = color.toSwift();
      expect(swift).toMatch(/\d+\.\d{2}/g);
    });
  });

  describe('toObjc', () => {
    it('converts to Objective-C color format', () => {
      const color = Color.fromRgb(255, 0, 0);
      expect(color.toObjc()).toBe('[UIColor colorWithRed:1.00 green:0.00 blue:0.00 alpha:1.00]');
    });

    it('includes alpha channel in Objective-C format', () => {
      const color = Color.fromRgb(128, 128, 128, 0.5);
      expect(color.toObjc()).toBe('[UIColor colorWithRed:0.50 green:0.50 blue:0.50 alpha:0.50]');
    });

    it('converts black to Objective-C format', () => {
      const color = Color.fromRgb(0, 0, 0);
      expect(color.toObjc()).toBe('[UIColor colorWithRed:0.00 green:0.00 blue:0.00 alpha:1.00]');
    });

    it('formats values to 2 decimal places', () => {
      const color = Color.fromRgb(100, 150, 200);
      const objc = color.toObjc();
      expect(objc).toMatch(/\d+\.\d{2}/g);
    });
  });

  describe('toString', () => {
    it('returns RGBA format by default', () => {
      const color = Color.fromRgb(255, 0, 0, 1);
      expect(color.toString()).toBe('rgb(255 0 0)');
    });
  });

  describe('integration', () => {
    it('round-trips through hex conversion', () => {
      const original = Color.fromRgb(200, 100, 50);
      const hex = original.toHex();
      const fromHex = Color.fromString(hex);
      expect(fromHex.toRgb()).toBe(original.toRgb());
    });

    it('produces consistent hex output', () => {
      const color = Color.fromString('#FF8040');
      const hex1 = color.toHex();
      const hex2 = color.toHex();
      expect(hex1).toBe(hex2);
    });

    it('converts through multiple formats without loss', () => {
      const color = Color.fromRgb(255, 128, 64);
      expect(color.toRgb()).toBe('rgb(255 128 64)');
      expect(color.toHex()).toMatch(/^#[0-9A-F]{6}$/);
      expect(color.toHsl()).toMatch(/^hsl\(\d+ \d+% \d+%\)$/);
    });
  });
});
