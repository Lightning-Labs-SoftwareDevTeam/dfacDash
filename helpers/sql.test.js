"use strict";

const { sqlForPartialUpdate } = require('./sql');
const { BadRequestError } = require('../expressError');

describe("sqlForPartialUpdate", () => {
    test("should generate correct SQL query parts for a valid input", () => {
        expect.assertions(1);
        
        const dataToUpdate = { firstName: 'Ralph', email: 'wiggum@mail.com' };
        const jsToSQL = { firstName: 'fname' };
        const result = sqlForPartialUpdate(dataToUpdate, jsToSQL);

        expect(result).toEqual({
            setCols: '"fname"=$1, "email"=$2',
            values: ['Ralph', 'wiggum@mail.com']
        });
    });

    test("should throw BadRequestError for empty datta", () => {
        expect.assertions(1);

        expect(() => {
            sqlForPartialUpdate({}, {})
        }).toThrow(BadRequestError);
    });
});