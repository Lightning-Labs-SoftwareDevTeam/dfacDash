const { BadRequestError } = require("../expressError");

/**
 * Generate SQL code for updating a row with partial data.
 * 
 * sqlForPartialUpdate function takes an object containing the data to be updated into the
 * database and an object that maps JavaScript object keys to:  SQL column-name values.
 * Outputs an object with two properties, a string of SQL code for updating the columns,
 * and an array of the corresponding values for use in the SQL query.
 * 
 * The function ensures that the SQL code resists injection by using parameterized queries.
 * 
 * @param {Object} dataToUpdate - An object representing the data for the update.
 *                              Each key-value pair represents a column and corresponding data.
 *                              Example: { firstName: 'Aliya', age: 32 }
 * @param {Object} jsToSql - An object mapping JavaScript keys to corresponding SQL column names.
 *                          If a key doesn't have a mapping, the key itself is used as the column name.
 *                          Example: { firstName: 'first_name', lastName: 'last_name' }
 * @returns {Object} - An object with two properties:
 *                      setCols: A string of SQL code representing the columns to update,
 *                          formatted as `"column_name"=$1, "another_column"=$2, ...`
 *                      values: An array of the values corresponding to the placeholders specified
 *                          in the setCols property.
 * @throws {BadRequestError} - If 'dataToUpdate' is empty, the function throws a BadRequestError,
 *                             indicating that no data was provided for the update.
 * 
 * @example
 * sqlForPartialUpdate({ firstName: 'Aliya', age: 32 }, { firstName: 'first_name' });
 * // Returns 
 * //    {
 * //    setCols: '"first_name"=$1, "age"=$2,
 * //    values: ['Aliya', 32]
 * //    }
 */
function sqlForPartialUpdate(dataToUpdate, jsToSql) {
    const keys = Object.keys(dataToUpdate);
    if (keys.length === 0) throw new BadRequestError("No data");

    // {firstName: 'Aliya', age: 32} --> ['"first_name"=$1, "age"=$2']
    const cols = keys.map((colName, idx) =>
        `"${jsToSql[colName] || colName}"=$${idx + 1}`
    );

    return {
        setCols: cols.join(", "),
        values: Object.values(dataToUpdate)
    };
}

module.exports = { sqlForPartialUpdate };