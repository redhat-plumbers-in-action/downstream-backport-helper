import { describe, expect, test } from 'vitest';

import { getArrayIndex, getCherryPicks } from '../../src/util';

describe('Util functions', () => {
  test('getCherryPicks()', () => {
    let message = 'message';
    expect(getCherryPicks(message)).toEqual([]);

    message = 'message\n(cherry picked from commit 1234567890)\n';
    expect(getCherryPicks(message)).toEqual(['1234567890']);

    message =
      'message\n(cherry picked from commit 1234567890)\n(cherry picked from commit 0987654321)\n';
    expect(getCherryPicks(message)).toEqual(['1234567890', '0987654321']);
  });

  test('getArrayIndex()', () => {
    const array = [
      { a: 1, b: 2 },
      { a: 3, b: 4 },
    ];

    expect(getArrayIndex(array, 'a', 1)).toEqual(0);
    expect(getArrayIndex(array, 'a', 2)).toEqual(-1);
    expect(getArrayIndex(array, 'a', 3)).toEqual(1);
  });
});
