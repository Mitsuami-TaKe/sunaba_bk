import { isString } from '../../src/common/validateUtils';

import * as r from '../../src/common/result'; // `Success`と`Failure`が定義されているファイルをインポート

describe('isString function', () => {

    test('should return Failure when item is null and isNull is false', () => {
        const result = isString(null as any, false, false);
        expect(result.isFailure()).toBe(true);
        expect(result).toBeInstanceOf(r.Failure);
        expect(result.value).toBe('item is null/undefined');
    });

    test('should return Success with empty string when item is null and isNull is true', () => {
        const result = isString(null as any, false, true);
        expect(result.isSuccess()).toBe(true);
        expect(result).toBeInstanceOf(r.Success);
        expect(result.value).toBe('');
    });

    test('should return Failure when item is not a string', () => {
        const result = isString(123 as any, false, false);
        expect(result.isFailure()).toBe(true);
        expect(result).toBeInstanceOf(r.Failure);
        expect(result.value).toBe("123's type is not string");
    });

    test('should return Failure when item is an empty string and isEmpty is false', () => {
        const result = isString('', false, false);
        expect(result.isFailure()).toBe(true);
        expect(result).toBeInstanceOf(r.Failure);
        expect(result.value).toBe('item is empty');
    });

    test('should return Success with empty string when item is an empty string and isEmpty is true', () => {
        const result = isString('', true, false);
        expect(result.isSuccess()).toBe(true);
        expect(result).toBeInstanceOf(r.Success);
        expect(result.value).toBe('');
    });

    test('should return Success with trimmed string when item is a non-empty string', () => {
        const result = isString('  valid string  ', false, false);
        expect(result.isSuccess()).toBe(true);
        expect(result).toBeInstanceOf(r.Success);
        expect(result.value).toBe('valid string');
    });

    test('should return Success when string is valid and does not require trimming', () => {
        const result = isString('valid string', false, false);
        expect(result.isSuccess()).toBe(true);
        expect(result).toBeInstanceOf(r.Success);
        expect(result.value).toBe('valid string');
    });
});