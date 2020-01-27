import {isEmptyArray} from "../../src/js/helpers/array";

describe('isEmptyArray', () => {
    describe('given an undefined value', () => {
        const fixture = undefined;
        it('returns true', () => {
            expect(isEmptyArray(fixture)).toBeTruthy();
        })
    });
});
