import { describe, it, expect } from 'vitest';
import ColorParser from './ColorParser.js';
import Color from './Color.js';

describe('ColorParser', () => {
  it('parses html color names', () => {
    expect(new ColorParser('red').getColor()).toEqual(new Color(255, 0, 0, 1));
    expect(new ColorParser('green').getColor()).toEqual(new Color(0, 128, 0, 1));
    expect(new ColorParser('BlueViolet').getColor()).toEqual(new Color(138, 43, 226, 1));
  });

  it('parses hex colors', () => {
    expect(new ColorParser('#FF0000').getColor()).toEqual(new Color(255, 0, 0, 1));
    expect(new ColorParser('#00FF00').getColor()).toEqual(new Color(0, 255, 0, 1));
    expect(new ColorParser('#0000FF').getColor()).toEqual(new Color(0, 0, 255, 1));
    expect(new ColorParser('#eee').getColor()).toEqual(new Color(238, 238, 238, 1));
  });

  it('parses hex colors without hash', () => {
    expect(new ColorParser('FF0000').getColor()).toEqual(new Color(255, 0, 0, 1));
    expect(new ColorParser('00FF00').getColor()).toEqual(new Color(0, 255, 0, 1));
    expect(new ColorParser('0000FF').getColor()).toEqual(new Color(0, 0, 255, 1));
    expect(new ColorParser('eee').getColor()).toEqual(new Color(238, 238, 238, 1));
  });

  it('parses rgb colors', () => {
    expect(new ColorParser('rgb(255, 0, 0)').getColor()).toEqual(new Color(255, 0, 0, 1));
    expect(new ColorParser('rgb(0, 255, 0)').getColor()).toEqual(new Color(0, 255, 0, 1));
    expect(new ColorParser('rgb(0, 0, 255)').getColor()).toEqual(new Color(0, 0, 255, 1));
    expect(new ColorParser('rgb(238, 238, 238)').getColor()).toEqual(new Color(238, 238, 238, 1));
  });

  it('parses incomplete rgb colors', () => {
    expect(new ColorParser('123, 234, 0').getColor()).toEqual(new Color(123, 234, 0, 1));
    expect(new ColorParser('gb(0, 255, 0)').getColor()).toEqual(new Color(0, 255, 0, 1));
    expect(new ColorParser('rgb(0, 0, 255').getColor()).toEqual(new Color(0, 0, 255, 1));
  });
});
