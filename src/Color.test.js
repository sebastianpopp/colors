import { describe, it, expect } from 'vitest';
import Color from './Color.js';

describe('Color', () => {
  describe('constructor', () => {
    it('creates a Color instance with RGB and alpha values', () => {
      const color = new Color(255, 0, 0, 1);
      expect(color.r).toBe(255);
      expect(color.g).toBe(0);
      expect(color.b).toBe(0);
      expect(color.a).toBe(1);
    });

    it('stores RGB values exactly as provided', () => {
      const color = new Color(100, 150, 200, 0.5);
      expect(color.r).toBe(100);
      expect(color.g).toBe(150);
      expect(color.b).toBe(200);
      expect(color.a).toBe(0.5);
    });
  });

  describe('fromHex', () => {
    it('creates a Color from 6-digit hex color', () => {
      const color = Color.fromHex('FF0000');
      expect(color.r).toBe(255);
      expect(color.g).toBe(0);
      expect(color.b).toBe(0);
      expect(color.a).toBe(1);
    });

    it('creates a Color from 3-digit hex color', () => {
      const color = Color.fromHex('F00');
      expect(color.r).toBe(255);
      expect(color.g).toBe(0);
      expect(color.b).toBe(0);
      expect(color.a).toBe(1);
    });

    it('handles lowercase hex colors', () => {
      const color = Color.fromHex('ff00ff');
      expect(color.r).toBe(255);
      expect(color.g).toBe(0);
      expect(color.b).toBe(255);
      expect(color.a).toBe(1);
    });

    it('handles mixed case hex colors', () => {
      const color = Color.fromHex('AbCdEf');
      expect(color).toBeDefined();
      expect(color.r).toBe(171);
      expect(color.g).toBe(205);
      expect(color.b).toBe(239);
      expect(color.a).toBe(1);
    });
  });

  describe('fromRgb', () => {
    it('creates a Color from RGB values', () => {
      const color = Color.fromRgb(128, 64, 32);
      expect(color.r).toBe(128);
      expect(color.g).toBe(64);
      expect(color.b).toBe(32);
      expect(color.a).toBe(1);
    });

    it('creates black color', () => {
      const color = Color.fromRgb(0, 0, 0);
      expect(color.r).toBe(0);
      expect(color.g).toBe(0);
      expect(color.b).toBe(0);
      expect(color.a).toBe(1);
    });

    it('creates white color', () => {
      const color = Color.fromRgb(255, 255, 255);
      expect(color.r).toBe(255);
      expect(color.g).toBe(255);
      expect(color.b).toBe(255);
      expect(color.a).toBe(1);
    });
  });

  describe('fromRgbPercent', () => {
    it('converts percentage RGB to 0-255 values', () => {
      const color = Color.fromRgbPercent(100, 50, 0);
      expect(color.r).toBe(255);
      expect(color.g).toBe(128);
      expect(color.b).toBe(0);
      expect(color.a).toBe(1);
    });

    it('handles 0% RGB', () => {
      const color = Color.fromRgbPercent(0, 0, 0);
      expect(color.r).toBe(0);
      expect(color.g).toBe(0);
      expect(color.b).toBe(0);
      expect(color.a).toBe(1);
    });

    it('rounds percentage values correctly', () => {
      const color = Color.fromRgbPercent(50, 50, 50);
      expect(color.r).toBe(128);
      expect(color.g).toBe(128);
      expect(color.b).toBe(128);
      expect(color.a).toBe(1);
    });
  });

  describe('toName', () => {
    it('converts red color to name', () => {
      const color = Color.fromRgb(255, 0, 0);
      expect(color.toName()).toBe('red');
    });

    it('converts green color to name', () => {
      const color = Color.fromRgb(0, 128, 0);
      expect(color.toName()).toBe('green');
    });

    it('converts blue color to name', () => {
      const color = Color.fromRgb(0, 0, 255);
      expect(color.toName()).toBe('blue');
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
  });

  describe('toRgb', () => {
    it('converts to rgb() format', () => {
      const color = Color.fromRgb(255, 0, 0);
      expect(color.toRgb()).toBe('rgb(255, 0, 0)');
    });

    it('formats RGB values as comma-separated integers', () => {
      const color = Color.fromRgb(100, 150, 200);
      expect(color.toRgb()).toBe('rgb(100, 150, 200)');
    });

    it('converts black', () => {
      const color = Color.fromRgb(0, 0, 0);
      expect(color.toRgb()).toBe('rgb(0, 0, 0)');
    });
  });

  describe('toRgba', () => {
    it('converts to rgba() format with alpha value', () => {
      const color = new Color(255, 0, 0, 1);
      expect(color.toRgba()).toBe('rgba(255, 0, 0, 1)');
    });

    it('includes alpha channel', () => {
      const color = new Color(100, 150, 200, 0.5);
      expect(color.toRgba()).toBe('rgba(100, 150, 200, 0.5)');
    });

    it('handles alpha value of 0', () => {
      const color = new Color(255, 0, 0, 0);
      expect(color.toRgba()).toBe('rgba(255, 0, 0, 0)');
    });
  });

  describe('toRgbPercent', () => {
    it('converts RGB to percentage format', () => {
      const color = Color.fromRgb(255, 0, 0);
      expect(color.toRgbPercent()).toBe('rgb(100%, 0%, 0%)');
    });

    it('converts 128 to 50%', () => {
      const color = Color.fromRgb(128, 128, 128);
      expect(color.toRgbPercent()).toBe('rgb(50%, 50%, 50%)');
    });

    it('converts black', () => {
      const color = Color.fromRgb(0, 0, 0);
      expect(color.toRgbPercent()).toBe('rgb(0%, 0%, 0%)');
    });

    it('converts white', () => {
      const color = Color.fromRgb(255, 255, 255);
      expect(color.toRgbPercent()).toBe('rgb(100%, 100%, 100%)');
    });
  });

  describe('toHsl', () => {
    it('converts to HSL format', () => {
      const color = Color.fromRgb(255, 0, 0);
      expect(color.toHsl()).toBe('hsl(0, 100%, 50%)');
    });

    it('converts green to HSL', () => {
      const color = Color.fromRgb(0, 255, 0);
      expect(color.toHsl()).toBe('hsl(120, 100%, 50%)');
    });

    it('converts blue to HSL', () => {
      const color = Color.fromRgb(0, 0, 255);
      expect(color.toHsl()).toBe('hsl(240, 100%, 50%)');
    });

    it('converts gray', () => {
      const color = Color.fromRgb(128, 128, 128);
      const hsl = color.toHsl();
      expect(color.toHsl()).toBe('hsl(0, 0%, 50%)');
    });
  });

  describe('toHsv', () => {
    it('converts to HSV format', () => {
      const color = Color.fromRgb(255, 0, 0);
      expect(color.toHsv()).toBe('hsv(0, 100%, 100%)');
    });

    it('converts green to HSV', () => {
      const color = Color.fromRgb(0, 255, 0);
      expect(color.toHsv()).toBe('hsv(120, 100%, 100%)');
    });

    it('converts blue to HSV', () => {
      const color = Color.fromRgb(0, 0, 255);
      expect(color.toHsv()).toBe('hsv(240, 100%, 100%)');
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
      const color = new Color(128, 128, 128, 0.5);
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
      const color = new Color(128, 128, 128, 0.5);
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
      const color = new Color(255, 0, 0, 1);
      expect(color.toString()).toBe('rgba(255, 0, 0, 1)');
    });
  });

  describe('integration', () => {
    it('round-trips through hex conversion', () => {
      const original = Color.fromRgb(200, 100, 50);
      const hex = original.toHex();
      const fromHex = Color.fromHex(hex.substring(1)); // Remove #
      expect(fromHex.r).toBe(original.r);
      expect(fromHex.g).toBe(original.g);
      expect(fromHex.b).toBe(original.b);
    });

    it('produces consistent hex output', () => {
      const color = Color.fromHex('FF8040');
      const hex1 = color.toHex();
      const hex2 = color.toHex();
      expect(hex1).toBe(hex2);
    });

    it('converts through multiple formats without loss', () => {
      const color = Color.fromRgb(255, 128, 64);
      expect(color.toRgb()).toBe('rgb(255, 128, 64)');
      expect(color.toHex()).toMatch(/^#[0-9A-F]{6}$/);
      expect(color.toHsl()).toMatch(/^hsl\(\d+, \d+%, \d+%\)$/);
    });
  });
});
