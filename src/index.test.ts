import { editDistance } from './index';
import { EDIT_RECORD_TYPE, IEditDistanceResult } from './schema';

it('can handle empty strings', () => {
    const expectedResult: IEditDistanceResult = {
        distance: 0,
        records: [],
    };
    const result = editDistance('', '');

    expect(result).toEqual(expectedResult);
});

it('can handle delete edit', () => {
    const expectedResult: IEditDistanceResult = {
        distance: 1,
        records: [{
            type: EDIT_RECORD_TYPE.DELETE,
            str1: {
                index: 0,
                value: 'a',
            },
            str2: {
                index: -1,
                value: '',
            },
        }],
    };
    const result = editDistance('a', '');

    expect(result).toEqual(expectedResult);
});

// console.log(editDistance('foo', 'food'));

// console.log(editDistance('', 'a'));
// console.log(editDistance('a', 'b'));
// console.log(editDistance('a', 'a'));

// console.log(editDistance('ab', 'a'));
// console.log(editDistance('ab', 'abc'));
// console.log(editDistance('ab', 'cb'));
// console.log(editDistance('ab', 'ab'));

// console.log(editDistance('browser', 'browse'));
// console.log(editDistance('GCTATGCCACGC', 'GCGTATGCACGC'));