"use strict";

const db = require("../db");
const { sqlForPartialUpdate } = require("../helpers/sql");
const {
    NotFoundError,
    BadRequestError,
    UnauthorizedError
} = require("../expressError");

const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR } = require("../config");

/** DFAC class consolidates CRUD for data interactions with the restaurants */
class Dfac {
    /** Add a new dfac to the database - CREATE
     * 
     *  Requires {dfacName, street, city, state, zip, dfacPhone} as input, but optionally accepts all the other dfac attributes too
     * 
     *  returns { dfacName, dfacLogo, street, bldgNum, city, state, zip, dfacPhone, flashMsg1, flashMsg2,
     *              bfHours, luHours, dnHours, bchHours, supHours, orderBf, orderLu, orderDn, orderBch, orderSup }
     */
    static async add(
        { dfacName, dfacLogo=null, street, bldgNum=null, city, state, zip, dfacPhone, flashMsg1=null, flashMsg2=null,
            bfHours=null, luHours=null, dnHours=null, bchHours=null, supHours=null, orderBf=null, orderLu=null, orderDn=null, orderBch=null, 
            orderSup=null }
    ) {
        const duplicateCheck = await db.query(
            `SELECT dfac_name from dfacs
                WHERE username = $1`,
            [dfacName]
        );
        if (duplicateCheck.rows[0]) {
            throw new BadRequestError(`Duplicate dfac: ${dfacName}`);
        }

        const result = await db.query(
            `INSERT INTO dfacs
                            (dfac_name,
                                dfac_logo
                                street_address,
                                bldg_num,
                                city text NOT
                                state_abb,
                                zip_code,
                                dfac_phnumber,
                                flash_msg1,
                                flash_msg2,
                                bf_hours,
                                lu_hours,
                                dn_hours,
                                bch_hours,
                                sup_hours,
                                order_timebf, 
                                order_timelu,
                                order_timedn,
                                order_timebch,
                                order_timesup)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16. $17, $18, $19, $20)
                RETURNING id AS "dfacID", dfac_name AS "dfacName", dfac_logo AS "dfacLogo", street_address AS "street", bldg_num AS bldgNum,
                    city, state_abb AS "state", zip_code AS "zip", dfac_phnumber AS "dfacPhone", flash_msg1 AS "flashMsg1",
                    flash_msg2 AS "flashMsg2", bf_hours AS "bfHours", lu_hours AS "luHours", dn_hours AS "dnHours", order_timebf
                    AS "orderBf", order_timelu AS "orderLu", order_timedn AS "orderDn", order_timesup AS "orderSup"`,
            [
                dfacName, dfacLogo, street, bldgNum, city,
                state, zip, dfacPhone, flashMsg1, flashMsg2, 
                bfHours, luHours, dnHours, bchHours, supHours, 
                orderBf, orderLu, orderDn, orderBch, orderSup
            ] 
        );

        return result.rows[0];
    }

    /** Find all dfacs - READ
     * 
     * returns all dfacs as the response object locals: dfacs
     * { dfacs: [ {dfacID, dfacName, dfacLogo, street, bldgNum, city, state, zip, dfacPhone, flashMsg1, flashMsg2,
     *                  bfHours, luHours, dnHours, bchHours, supHours, orderBf, orderLu, orderDn, orderBch, orderSup },
     *                              {dfacName, ...}, {...}, ...] }
     */
    static async findAll() {
        const result = await db.query(
            `SELECT id AS "dfacID",
                    dfac_name AS "dfacName", 
                    dfac_logo AS "dfacLogo", 
                    street_address AS "street", 
                    bldg_num AS bldgNum,
                    city, 
                    state_abb AS "state", 
                    zip_code AS "zip", 
                    dfac_phnumber AS "dfacPhone", 
                    flash_msg1 AS "flashMsg1",
                    flash_msg2 AS "flashMsg2", 
                    bf_hours AS "bfHours", 
                    lu_hours AS "luHours", 
                    dn_hours AS "dnHours", 
                    order_timebf AS "orderBf", 
                    order_timelu AS "orderLu", 
                    order_timedn AS "orderDn", 
                    order_timesup AS "orderSup"
                FROM dfacs
                ORDER BY id`
        );

        return result.rows;
    }

    /** Find a dfac by dfacID - READ
     * 
     * returns
     * { dfac: {dfacID, dfacName, dfacLogo, street, bldgNum, city, state, zip, dfacPhone, flashMsg1, flashMsg2,
     *                  bfHours, luHours, dnHours, bchHours, supHours, orderBf, orderLu, orderDn, orderBch, orderSup} }
     */
    static async get(dfacID) {
        const result = await db.query(
            `SELECT id AS "dfacID",
                    dfac_name AS "dfacName", 
                    dfac_logo AS "dfacLogo", 
                    street_address AS "street", 
                    bldg_num AS bldgNum,
                    city, 
                    state_abb AS "state", 
                    zip_code AS "zip", 
                    dfac_phnumber AS "dfacPhone", 
                    flash_msg1 AS "flashMsg1",
                    flash_msg2 AS "flashMsg2", 
                    bf_hours AS "bfHours", 
                    lu_hours AS "luHours", 
                    dn_hours AS "dnHours", 
                    order_timebf AS "orderBf", 
                    order_timelu AS "orderLu", 
                    order_timedn AS "orderDn", 
                    order_timesup AS "orderSup"
                FROM dfacs
                WHERE id = $1`,
            [dfacID]
        );

        if (result.rows.length === 0 ) {
            throw new NotFoundError(`No dfac: ${dfacID}`);
        }

        return result.rows[0];
    }

    /** Supervisors and admin function to Patch dfac data with `data` - UPDATE
     * 
     * Partial update is perfectly acceptable; fields only changed if patch request
     * includes corresponding data.
     * 
     * Allowable data:
     *      { dfacName, dfacLogo, street, bldgNum, city, state, zip, dfacPhone,flashMsg1, flashMsg2,
     *           bfHours, luHours, dnHours, bchHours, supHours, orderBf, orderLu, orderDn, orderBch, orderSup }
     * 
     * returns
     * { dfac: {dfacID, dfacName, dfacLogo, street, bldgNum, city, state, zip, dfacPhone, flashMsg1, flashMsg2,
     *                  bfHours, luHours, dnHours, bchHours, supHours, orderBf, orderLu, orderDn, orderBch, orderSup} }
     *
     * throws NotFoundError if dfacID not found
     */
    static async update(dfacID, data) {
        const { setCols, values } = sqlForPartialUpdate(
            data,
            {
                dfacName: "dfac_name",  
                dfacLogo: "dfac_logo", 
                street: "street_address", 
                bldgNum: "bldg_num",
                city: "city",
                state: "state_abb",
                zip: "zip_code",
                dfacPhone: "dfac_phnumber",
                flashMsg1: "flash_msg1", 
                flashMsg2: "flash_msg2",
                bfHours: "bf_hours",
                luHours: "lu_hours",
                dnHours: "dn_hours",
                bchHours: "bch_hours",
                supHours: "sup_hours",
                orderBf: "order_timebf",
                orderLu: "order_timelu",
                orderDn: "order_timedn",
                orderBch:"order_timebch",
                orderSup: "order_timesup"      
            }
        );
        const dfacIDVarIdx = "$" + (values.length + 1);

        const querySql = `UPDATE customers
                            SET ${setCols}
                            WHERE id = ${dfacIDVarIdx}
                            RETURNING id AS "dfacID",
                                    dfac_name AS "dfacName", 
                                    dfac_logo AS "dfacLogo", 
                                    street_address AS "street", 
                                    bldg_num AS bldgNum,
                                    city, 
                                    state_abb AS "state", 
                                    zip_code AS "zip", 
                                    dfac_phnumber AS "dfacPhone", 
                                    flash_msg1 AS "flashMsg1",
                                    flash_msg2 AS "flashMsg2", 
                                    bf_hours AS "bfHours", 
                                    lu_hours AS "luHours", 
                                    dn_hours AS "dnHours", 
                                    order_timebf AS "orderBf", 
                                    order_timelu AS "orderLu", 
                                    order_timedn AS "orderDn", 
                                    order_timesup AS "orderSup"`;
        const result = await db.query(querySql, [...values, dfacID]);

        const dfac = result.rows[0];
        if (!dfac) throw new NotFoundError(`No dfac: ${dfacID}`);

        return dfac;
    }

    /** PATCH function to update dfac hours with `data` 
     *          - UPDATE - 
     * 
     * Partial update is perfectly acceptable; fields only changed if patch request
     * includes corresponding data.
     * 
     * Allowable data:
     *      {bfHours, luHours, dnHours, bchHours, supHours, orderBf, orderLu, orderDn, orderBch, orderSup}
     * 
     * returns
     * { dfac: {dfacID, dfacName, dfacLogo, street, bldgNum, city, state, zip, dfacPhone, flashMsg1, flashMsg2,
     *                  bfHours, luHours, dnHours, bchHours, supHours, orderBf, orderLu, orderDn, orderBch, orderSup} }
     *
     * throws NotFoundError if dfacID not found
     */
    static async updateHours(dfacID, data) {
        const { setCols, values } = sqlForPartialUpdate(
            data,
            {
                bfHours: "bf_hours",
                luHours: "lu_hours",
                dnHours: "dn_hours",
                bchHours: "bch_hours",
                supHours: "sup_hours",
                orderBf: "order_timebf",
                orderLu: "order_timelu",
                orderDn: "order_timedn",
                orderBch:"order_timebch",
                orderSup: "order_timesup"      
            }
        );
        const dfacIDVarIdx = "$" + (values.length + 1);

        const querySql = `UPDATE customers
                            SET ${setCols}
                            WHERE id = ${dfacIDVarIdx}
                            RETURNING id AS "dfacID",
                                    dfac_name AS "dfacName", 
                                    dfac_logo AS "dfacLogo", 
                                    street_address AS "street", 
                                    bldg_num AS bldgNum,
                                    city, 
                                    state_abb AS "state", 
                                    zip_code AS "zip", 
                                    dfac_phnumber AS "dfacPhone", 
                                    flash_msg1 AS "flashMsg1",
                                    flash_msg2 AS "flashMsg2", 
                                    bf_hours AS "bfHours", 
                                    lu_hours AS "luHours", 
                                    dn_hours AS "dnHours", 
                                    order_timebf AS "orderBf", 
                                    order_timelu AS "orderLu", 
                                    order_timedn AS "orderDn", 
                                    order_timesup AS "orderSup"`;
        const result = await db.query(querySql, [...values, dfacID]);

        const dfac = result.rows[0];
        if (!dfac) throw new NotFoundError(`No dfac: ${dfacID}`);

        return dfac;
    }
}

module.exports = Dfac;
