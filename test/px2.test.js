const { transformPX } = require('../lib/px2')

test('transform', () => {
  expect(transformPX('375px')).toBe('100vw');
  expect(transformPX('750px')).toBe('200vw');
  expect(transformPX('1125px')).toBe('300vw');
  expect(transformPX('280.875px')).toBe('74.9vw');
});

test('scale', () => {
  const fn = val => transformPX(val, { outputUnit: 'rem' })
  expect(fn('375px')).toBe('3.75rem');
  expect(fn('750px')).toBe('7.5rem');
  expect(fn('1125px')).toBe('11.25rem');
});

test('outputUnit', () => {
  const fn = val => transformPX(val, { outputUnit: 'vh' })
  expect(fn('375px')).toBe('100vh');
  expect(fn('750px')).toBe('200vh');
  expect(fn('1125px')).toBe('300vh');
  expect(fn('280.875px')).toBe('74.9vh');
});

test('minPixelValue', () => {
  expect(transformPX('375px')).toBe('100vw');
  expect(transformPX('-375px')).toBe('-100vw');
  expect(transformPX('1px')).toBe('1px');
  expect(transformPX('0px')).toBe('0px');
  expect(transformPX('0px', { minPixelValue: 10 })).toBe('0px');
  expect(transformPX('10px', { minPixelValue: 10 })).toBe('10px');
  expect(transformPX('11px', { minPixelValue: 10 })).toBe('2.933333vw');
});

test('precision', () => {
  expect(transformPX('375.88888888px')).toBe('100.237037vw');
  expect(transformPX('375.88888888px', { precision: 3 })).toBe('100.237vw');
  expect(transformPX('375.88888888px', { precision: 4 })).toBe('100.237vw');
  expect(transformPX('375.88888888px', { precision: 5 })).toBe('100.23704vw');
});

test('ignore', () => {
  expect(transformPX('375.88888888px/*ignore*/')).toBe('375.88888888px');
  expect(transformPX('375.88888888px /*ignore*/')).toBe('375.88888888px ');
  expect(transformPX('375.88888888px;/*ignore*/')).toBe('375.88888888px;');
  expect(transformPX('375.88888888px; /*ignore*/')).toBe('375.88888888px; ');
  expect(transformPX('375.88888888px/*ignore*/;')).toBe('375.88888888px;');
});