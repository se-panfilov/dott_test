import { isDefined } from './utils';

describe('Utils', () => {

  describe('isDefined', () => {

    it('should return true', () => {
      expect(isDefined('asd')).toBeTruthy();
      expect(isDefined(10)).toBeTruthy();
      expect(isDefined(0)).toBeTruthy();
      expect(isDefined({})).toBeTruthy();
      expect(isDefined([])).toBeTruthy();
      expect(isDefined(true)).toBeTruthy();
      expect(isDefined(false)).toBeTruthy();
      expect(isDefined('')).toBeTruthy();
      expect(isDefined(NaN)).toBeTruthy();
      expect(isDefined(Infinity)).toBeTruthy();
      expect(isDefined(-Infinity)).toBeTruthy();
    });

    it('should return false', () => {
      expect(isDefined(undefined)).toBeFalsy();
      expect(isDefined(null)).toBeFalsy();
    })

  })

});
