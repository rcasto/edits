import { editDistance } from './index';
import { EDIT_RECORD_TYPE, IEditDistanceResult } from './schema';

it('can handle not returning edit records', () => {
    const expectedResult: IEditDistanceResult = {
        distance: 1,
        records: undefined,
    };
    const result = editDistance('a', 'b');

    expect(result).toEqual(expectedResult);
});

it('can handle empty strings', () => {
    const expectedResult: IEditDistanceResult = {
        distance: 0,
        records: [],
    };
    const result = editDistance('', '', {
        returnEditRecords: true,
    });

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
            transformIndex: 0,
        }],
    };
    const result = editDistance('a', '', {
        returnEditRecords: true,
    });

    expect(result).toEqual(expectedResult);
});

it('can handle add edit', () => {
    const expectedResult: IEditDistanceResult = {
        distance: 1,
        records: [{
            type: EDIT_RECORD_TYPE.ADD,
            str1: {
                index: -1,
                value: '',
            },
            str2: {
                index: 0,
                value: 'a',
            },
            transformIndex: 0,
        }],
    };
    const result = editDistance('', 'a', {
        returnEditRecords: true,
    });

    expect(result).toEqual(expectedResult);
});

it('can handle replace edit', () => {
    const expectedResult: IEditDistanceResult = {
        distance: 1,
        records: [{
            type: EDIT_RECORD_TYPE.REPLACE,
            str1: {
                index: 0,
                value: 'a',
            },
            str2: {
                index: 0,
                value: 'b',
            },
            transformIndex: 0,
        }],
    };
    const result = editDistance('a', 'b', {
        returnEditRecords: true,
    });

    expect(result).toEqual(expectedResult);
});

it('can handle match edit', () => {
    const expectedResult: IEditDistanceResult = {
        distance: 0,
        records: [{
            type: EDIT_RECORD_TYPE.MATCH,
            str1: {
                index: 0,
                value: 'a',
            },
            str2: {
                index: 0,
                value: 'a',
            },
            transformIndex: 0,
        }],
    };
    const result = editDistance('a', 'a', {
        returnEditRecords: true,
    });

    expect(result).toEqual(expectedResult);
});

it('can handle multiple edits together', () => {
    const expectedResult: IEditDistanceResult = {
        distance: 3,
        records: [{
            type: EDIT_RECORD_TYPE.MATCH,
            str1: {
                index: 0,
                value: 'a',
            },
            str2: {
                index: 0,
                value: 'a',
            },
            transformIndex: 0,
        }, {
            type: EDIT_RECORD_TYPE.ADD,
            str1: {
                index: 0,
                value: 'a',
            },
            str2: {
                index: 1,
                value: 'b',
            },
            transformIndex: 1,
        }, {
            type: EDIT_RECORD_TYPE.ADD,
            str1: {
                index: 0,
                value: 'a',
            },
            str2: {
                index: 2,
                value: 'c',
            },
            transformIndex: 2,
        }, {
            type: EDIT_RECORD_TYPE.REPLACE,
            str1: {
                index: 1,
                value: 'e',
            },
            str2: {
                index: 3,
                value: 'd',
            },
            transformIndex: 3,
        }],
    };
    const result = editDistance('ae', 'abcd', {
        returnEditRecords: true,
    });

    expect(result).toEqual(expectedResult);
});

it('can handle multiple edits one of which is a delete edit record', () => {
    const expectedResult: IEditDistanceResult = {
        distance: 2,
        records: [{
            type: EDIT_RECORD_TYPE.DELETE,
            str1: {
                index: 0,
                value: 'b',
            },
            str2: {
                index: -1,
                value: '',
            },
            transformIndex: 0,
        }, {
            type: EDIT_RECORD_TYPE.REPLACE,
            str1: {
                index: 1,
                value: 'b',
            },
            str2: {
                index: 0,
                value: 'a',
            },
            transformIndex: 0,
        }],
    };
    const result = editDistance('bb', 'a', {
        returnEditRecords: true,
    });

    expect(result).toEqual(expectedResult);
});