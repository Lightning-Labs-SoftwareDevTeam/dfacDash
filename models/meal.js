"use strict";

const db = require("../db");
const { sqlForPartialUpdate } = require("../helpers/sql");
const {
    NotFoundError,
    BadRequestError,
    UnauthorizedError
} = require("../expressError");

/** Meal class consolidates CRUD for data interactions with meals */
class Meal {
    /** Create a new meal - CREATE
     * 
     * Requires { dfacID, mealName, description, type, price } as input
     * Optionally accepts all other meal attributes
     * 
     * Returns { mealID, dfacID, mealName, description, type, price, imgPic, likes, createdAt }
     */
    static async create(
        { dfacID, mealName, description, type, price, imgPic=null }
    ) {
        const result = await db.query(
            `INSERT INTO meals
                (dfac_id, meal_name, description, type, price, img_pic)
             VALUES ($1, $2, $3, $4, $5, $6)
             RETURNING id AS "mealID",
                        dfac_id AS "dfacID",
                        meal_name AS "mealName",
                        description,
                        type,
                        price,
                        img_pic AS "imgPic",
                        likes,
                        created_at AS "createdAt"`,
            [dfacID, mealName, description, type, price, imgPic]
        );

        return result.rows[0];
    }

    /** Find all meals - READ
     * 
     * Returns all meals as the response object locals: meals
     * { meals: [ {mealID, dfacID, mealName, description, type, price, imgPic, likes, createdAt}, {...}, {...}, ...] }
     */
    static async findAll() {
        const result = await db.query(
            `SELECT id AS "mealID",
                    dfac_id AS "dfacID",
                    meal_name AS "mealName",
                    description,
                    type,
                    price,
                    img_pic AS "imgPic",
                    likes,
                    created_at AS "createdAt"
            FROM meals
            ORDER BY id`
        );

        return result.rows;
    }

    /** Find a meal by mealID - READ
     * 
     * Returns
     * { meal: {mealID, dfacID, mealName, description, type, price, imgPic, likes, createdAt}
     *      items: [{ itemID, menuItem, foodType, recipeCode, description,
     *             likes, colorCode, sodiumLvl, regsStandard }, { itemID,... },
     *              {...}, ...}] 
     *                              }
     */
    static async get(mealID) {
        const mealRes = await db.query(
            `SELECT id AS "mealID",
                    dfac_id AS "dfacID",
                    meal_name AS "mealName",
                    description,
                    type,
                    price,
                    img_pic AS "imgPic",
                    likes,
                    created_at AS "createdAt"
            FROM meals
            WHERE id = $1`,
            [mealID]
        );

        const itemsRes = await db.query(
                `SELECT i.id AS "itemID",
                        i.menu_item AS "menuItem",
                        i.food_type AS "foodType",
                        i.description,
                        i.likes,
                        i.color_code AS "colorCode",
                        i.sodium_level AS "sodiumLvl"
                    FROM items i
                    JOIN meal_items mi ON i.id = mi.item_id
                    JOIN meals m ON mi.meal_id = m.id
                    WHERE m.id = $1`,
                [mealID]
        );

        const meal = mealRes.rows[0];
        if (!meal) throw new NotFoundError(`No mealID: ${mealID}`);

        const items = itemsRes.rows

        const mealAndItems = {
            meal: meal,
            items: items
        };

        return mealAndItems;
    }

    /** Update a meal with `data` - UPDATE
     * 
     * Partial update is perfectly acceptable; fields only changed if patch request
     * includes corresponding data.
     * 
     * Allowable data:
     * { mealName, description, type, price, imgPic }
     * 
     * Returns
     * { meal: {mealID, dfacID, mealName, description, type, price, imgPic, likes, createdAt, updatedAt} }
     *
     * Throws NotFoundError if mealID not found
     */
    static async update(mealID, data) {
        const { setCols, values } = sqlForPartialUpdate(
            data,
            {
                mealName: "meal_name",
                description: "description",
                type: "type",
                price: "price",
                imgPic: "img_pic"
            }
        );
        const mealIDVarIdx = "$" + (values.length + 1);

        const querySql = `UPDATE meals
                            SET ${setCols}, updated_at = CURRENT_TIMESTAMP
                            WHERE id = ${mealIDVarIdx}
                            RETURNING id AS "mealID",
                                    dfac_id AS "dfacID",
                                    meal_name AS "mealName",
                                    description,
                                    type,
                                    price,
                                    img_pic AS "imgPic",
                                    likes,
                                    created_at AS "createdAt",
                                    updated_at AS "updatedAt"`;
        const result = await db.query(querySql, [...values, mealID]);

        const meal = result.rows[0];
        if (!meal) throw new NotFoundError(`No meal: ${mealID}`);

        return meal;
    }

    /** "Soft" delete
     * 
     * Marks a meal as deleted by setting the deleted_at field without
     * actually deleting the meals row
     * 
     * Returns mealID of "deleted" meal; throws NotFoundError if no mealID found
     */
    static async remove(mealID) {
        let result = await db.query(
            `UPDATE meals
                SET deleted_at = CURRENT_TIMESTAMP
                WHERE id = $1
                RETURNING id AS "mealID"`,
            [mealID]
        );

        const meal = result.rows[0];
        if (!meal) throw new NotFoundError(`No meal: ${mealID}`);

        return meal;
    }
}

module.exports = Meal;
