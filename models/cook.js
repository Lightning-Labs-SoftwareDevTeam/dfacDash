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
     *      isAdmin, isManager, updateMenu, updateHours, updateMeals, updateOrders, createdAt, updatedAt }
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
                    update_orders AS "updateOrders",
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
     *          isAdmin, isManager, updateMenu, updateHours, updateMeals, updateOrders }
     * 
     * throws BadRequestError on duplicates
     */
    static async register(
        { dfacID, username, password, rank, firstName, lastName, dodid, email, profilPicURL,
            isAdmin, isManager, updateMenu, updateHours, updateMeals, updateOrders}
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
                                update_meals,
                                update_orders)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
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
                            update_meals AS "updateMeals",
                            update_orders AS "updateOrders"`,
            [
                dfacID, username, hashedPassword, rank, firstName, lastName, dodid, email,
                profilPicURL, isAdmin, isManager, updateMenu, updateHours, updateMeals, updateOrders
            ]
        );

        const cook = result.rows[0];
        cook.role = "92G";

        return cook;
    }

    /** Find all cooks - READ
     * 
     * returns [{ cookID, dfacID, username, rank, firstName, lastName, dodid, email, profilePicURL,
     *               isAdmin, isManagaer, updateMenu, updateHours, updateMeals, updateOrders, createdAt
     *               updatedAt, deletedAt }, { cookID, ... }, { ... }, ...]
     */
    static async findAll() {
        const result = await db.query(
            `SELECT id AS "cookID",
                    dfac_id AS "dfacID",
                    username,
                    rank,
                    fname AS "firstName",
                    lname AS "lastName",
                    dodid,
                    email,
                    profile_pic AS "profilePicURL",
                    is_admin AS "isAdmin",
                    is_manager AS "isManager",
                    update_menu AS "updateMenu",
                    update_hours AS "updateHours",
                    update_meals AS "updateMeals",
                    update_orders AS "updateOrders",
                    created_at AS "createdAt",
                    updated_at AS "updatedAt",
                    deleted_at AS "deletedAt"
                FROM cooks
                ORDER BY lname`
        );

        return result.rows;
    }
    static async findAllFromDFAC(dfacID) {
        const result = await db.query(
            `SELECT id AS "cookID",
                    dfac_id AS "dfacID",
                    username,
                    rank,
                    fname AS "firstName",
                    lname AS "lastName",
                    dodid,
                    email,
                    profile_pic AS "profilePicURL",
                    is_admin AS "isAdmin",
                    is_manager AS "isManager",
                    update_menu AS "updateMenu",
                    update_hours AS "updateHours",
                    update_meals AS "updateMeals",
                    update_orders AS "updateOrders",
                    created_at AS "createdAt",
                    updated_at AS "updatedAt",
                    deleted_at AS "deletedAt"
                FROM cooks
                WHERE dfac_id = $1
                ORDER BY lname`,
                [dfacID]
        );

        return result.rows;
    }

    /** Function for associating a username with a DFAC id 
     * 
     * throws NotFoundError if username not found, otherwise
     *  sets the id = 0 if dfac_id field IS NULL
     * 
    */
    static async getDFACIDbyUsername(username) {
        const result = await db.query(
            `SELECT dfac_id AS "dfacID"
                FROM cooks
                WHERE username = $1`,
            [username]
        );

        if (result.rows.length === 0 ) {
            throw new NotFoundError(`No user: ${username}`);
        }

        const dfacID = result.rows[0].dfacID;
        if (dfacID === null) {
            dfacID = 0;
        }

        return dfacID;
    }

    /** Given a 92G username, return data about that 92G - READ
     * 
     * returns returns { "cook": {dfacID, cookID, username, rank, firstName, lastName, dodid, email, profilePicURL, isAdmin,
     *              isManager, updateMenu, updateHours, updateMeals, updateOrders, createdAt, updated, deletedAt}
     * 
     * throws NotFoundError if username not found
     */
    static async get(username) {
        const result = await db.query(
            `SELECT id AS "cookID",
                    dfac_id AS "dfacID",
                    username,
                    rank,
                    fname AS "firstName",
                    lname AS "lastName",
                    dodid,
                    email,
                    profile_pic AS "profilePicURL",
                    is_admin AS "isAdmin",
                    is_manager AS "isManager",
                    update_menu AS "updateMenu",
                    update_hours AS "updateHours",
                    update_meals AS "updateMeals",
                    update_orders AS "updateOrders",
                    created_at AS "createdAt",
                    updated_at AS "updatedAt",
                    deleted_at AS "deletedAt"
                FROM cooks
                WHERE username = $1`,
                [username]
        );

        if (result.rows.length === 0 ) {
            throw new NotFoundError(`No user: ${username}`);
        }
        const cook = result.rows[0];

        return cook;
    }

    /** Supervisors and admin function to Patch 92G data with `data` - UPDATE
     * 
     * Partial update is perfectly acceptable; fields only changed if patch request
     * includes corresponding data.
     * 
     * Allowable data:
     *      { dfacID, rank, firstName, lastName, email, profilePicURL, isAdmin,
     *                      isManager, updateMenu, updateHours, updateMeals, updateOrders }
     * 
     * returns  { dfacID, username, rank, firstName, lastName, email, profilePicURL isAdmin, isManager,
     *             updateMenu, updateHours, updateMeals, updateOrders, updatedAt }
     * 
     * throws NotFoundError if username not found
     */
    static async update(username, data) {
        const { setCols, values } = sqlForPartialUpdate(
            data,
            {
                dfacID: "dfac_id",
                rank: "rank",
                firstName: "fname",
                lastName: "lname",
                email: "email",
                profilePicURL: "profile_pic",
                isAdmin: "is_admin",
                isManager: "is_manager",
                updateMenu: "update_menu",
                updatehours: "update_hours",
                updateMeals: "update_meals",
                updateOrders: "update_orders"                
            }
        );
        const usernameVarIdx = "$" + (values.length + 1);

        // Automatically adding current timestamp into updated_at field
        const querySql = `UPDATE customers
                            SET ${setCols}, updated_at = CURRENT_TIMESTAMP
                            WHERE username = ${usernameVarIdx}
                            RETURNING dfac_id AS "dfacID",
                                        username,
                                        rank,
                                        fname AS "firstName",
                                        lname AS "lastName",
                                        email,
                                        profile_pic AS "profilePicURL",
                                        is_admin AS "isAdmin",
                                        is_manager AS "isManager,
                                        update_menu AS "updateMenu",
                                        update_hours AS "updateHours,
                                        update_meals AS "updateMeals",
                                        update_orders AS "updateOrders",
                                        updated_at AS "updatedAt"`;
        const result = await db.query(querySql, [...values, username]);

        const cook = result.rows[0];
        if (!cook) throw new NotFoundError(`No user: ${username}`);

        delete cook.password;
        return cook;
    }

    /** Self-modify Patch 92G data with `data` - UPDATE
     * 
     * Partial update is perfectly acceptable; fields only changed if patch request
     * includes corresponding data.
     * 
     * Allowable data:
     *      { password, rank, firstName, lastName, email, profilePicURL }
     * 
     * returns  { dfacID, username, rank, firstName, lastName, email, profilePicURL isAdmin, isManager,
     *             updateMenu, updateHours, updateMeals, updateOrders, updatedAt }
     * 
     * throws NotFoundError if username not found
     */
        static async selfEdit(username, data) {
            if (data.password) {
                data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
            }

            const { setCols, values } = sqlForPartialUpdate(
                data,
                {
                    rank: "rank",
                    firstName: "fname",
                    lastName: "lname",
                    email: "email",
                    profilePicURL: "profile_pic",             
                }
            );
            const usernameVarIdx = "$" + (values.length + 1);
    
            // Automatically adding current timestamp into updated_at field
            const querySql = `UPDATE customers
                                SET ${setCols}, updated_at = CURRENT_TIMESTAMP
                                WHERE username = ${usernameVarIdx}
                                RETURNING dfac_id AS "dfacID",
                                            username,
                                            rank,
                                            fname AS "firstName",
                                            lname AS "lastName",
                                            email,
                                            profile_pic AS "profilePicURL",
                                            is_admin AS "isAdmin",
                                            is_manager AS "isManager,
                                            update_menu AS "updateMenu",
                                            update_hours AS "updateHours,
                                            update_meals AS "updateMeals",
                                            update_orders AS "updateOrders",
                                            updated_at AS "updatedAt"`;
            const result = await db.query(querySql, [...values, username]);
    
            const cook = result.rows[0];
            if (!cook) throw new NotFoundError(`No user: ${username}`);
    
            delete cook.password;
            return cook;
        }

    /** "Soft" delete
     * 
     * marks a cook as deleted by setting the deleted_at field without
     *    actually deleting the cooks row
     * 
     * returns username of "deleted" 92G; throws NotFoundError if no username found
     */
    static async remove(username) {
        let result = await db.query(
            `UPDATE cooks
                SET deleted_at = CURRENT_TIMESTAMP
                WHERE username = $1
                RETURNING username`,
            [username]
        );

        const cook = result.rows[0];
        if (!cook) throw new NotFoundError(`No user: ${username}`);

        return cook;
    }
}

module.exports = Cook;
