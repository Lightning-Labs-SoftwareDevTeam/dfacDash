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
                RETURNING dfac_name AS "dfacName", dfac_logo AS "dfacLogo", street_address AS "street", bldg_num AS bldgNum,
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
}

module.exports = Dfac;
