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

/** 92G class consolidates CRUD functions for users operating the DFACs */

class Cook {
    /** authenticate 92G with username and password
     * 
     * returns { dfacID, username, rank, firstName, lastName, email, profilePicURL,
     *      isAdmin, isManager, updateMenu, updateHours, updateMeals, createdAt, updatedAt }
     * 
     * throws UnauthorizedError if customer not found or wrong password
     */
    static async authenticate(username, password) {
        // look for user first
        const result = await db.query(
            `SELECT dfac_id AS "dfacID"
                    username,
                    rank,
                    fname AS "firstName",
                    lname AS "lastName",
                    email,
                    profile_pic AS "profilePicURL",
                    is_admin AS "isAdmin",
                    is_manager AS "isManager",
                    update_menu AS "updateMenu",
                    update_hours AS "updateHours",
                    update_meals AS "updateMeals",
                    created_at AS "createdAt",
                    updated_at AS "updatedAt"
                FROM cooks
                WHERE username = $1`,
            [username]
        );    
        const cook = result.rows[0];

        //second verify 92G by comparing hashed password with a new hash from password
        const isValid = await bcrypt.compare(password, cook.password);
        if (isValid === true) {
            delete cook.password;
            return cook;
        }
        // if bad password, throw Unauthorized error
        throw new UnauthorizedError("Invalid username/password");
    }

    /** Register new 92G with data - CREATE
     * 
     * returns { dfacID, username, rank, firstName, lastName, dodid, email, profilePicURL,
     *          isAdmin, isManager, updateMenu, updateHours, updateMeals }
     * 
     * throws BadRequestError on duplicates
     */
    static async register(
        { dfacID, username, password, rank, firstName, lastName, dodid, email, profilPicURL,
            isAdmin, isManager, updateMenu, updateHours, updateMeals}
    ) {
        const duplicateCheck = await db.query(
            `SELECT username FROM cooks
                WHERE username = $1`,
            [username]
        );
        if (duplicateCheck.rows[0]) {
            throw new BadRequestError(`Duplicate username ${username}`);
        }

        const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

        const result = await db.query(
            `INSERT INTO cooks
                            (dfac_id,
                                username,
                                password,
                                rank,
                                fname,
                                lname,
                                dodid,
                                email,
                                profile_pic,
                                is_admin,
                                is_manager,
                                update_menu,
                                update_hours,
                                update_meals)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
                RETURNING dfac_id AS "dfacID",
                            username, rank,
                            fname AS "firstName",
                            lname AS "lastName",
                            dodid, email,
                            profile_pic AS "profilePicURL",
                            is_admin AS "isAdmin",
                            is_manager AS "isManager",
                            update_menu AS "updateMenu",
                            update_hours AS "updateHours",
                            update_meals AS "updateMeals"`,
            [
                dfacID, username, hashedPassword, firstName, lastName, dodid, email,
                profilPicURL, isAdmin, isManager, updateMenu, updateHours, updateMeals
            ]
        );

        const cook = result.rows[0];
        cook.role = "92G";

        return cook;
    }
}