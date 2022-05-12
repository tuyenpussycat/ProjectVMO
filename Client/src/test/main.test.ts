import { isPositive } from './main';

describe('isPositive()', () => {
  it('return true when >0', () => {
    expect(isPositive(1)).toBe(true);
  });
  it('return false when = 0', () => {
    expect(isPositive(0)).toBe(false);
  });
  it('return false when < 0', () => {
    expect(isPositive(-1)).toBe(false);
  });
});
