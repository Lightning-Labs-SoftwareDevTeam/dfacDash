"use strict";

const db = require("../db");
const {
  NotFoundError,
  BadRequestError,
} = require("../expressError");

/** Surrogate class for handling surrogate orders */
class Surrogate {
  /** Create a new surrogate order
   * 
   * Accepts { orderId, customerId, surrogateId, mealId, authorizationDoc }
   * 
   * Returns { id, orderId, customerId, surrogateId, mealId, authorizationDoc }
   */
  static async create({ orderId, customerId, surrogateId, mealId, authorizationDoc }) {
    const result = await db.query(
      `INSERT INTO surrogates (order_id, customer_id, surrogate_id, meal_id, authorization_doc)
           VALUES ($1, $2, $3, $4, $5)
           RETURNING id, order_id AS "orderId", customer_id AS "customerId", surrogate_id AS "surrogateId",
                     meal_id AS "mealId", authorization_doc AS "authorizationDoc"`,
      [orderId, customerId, surrogateId, mealId, authorizationDoc]
    );
    const surrogate = result.rows[0];

    return surrogate;
  }

  /** Find all surrogate orders
   * 
   * Returns [{ id, orderId, customerId, surrogateId, mealId, authorizationDoc }, ...]
   */
  static async findAll() {
    const result = await db.query(
      `SELECT id, order_id AS "orderId", customer_id AS "customerId", surrogate_id AS "surrogateId",
                   meal_id AS "mealId", authorization_doc AS "authorizationDoc"
           FROM surrogates`
    );
    return result.rows;
  }

  /** Find a surrogate order by ID
   * 
   * Returns { id, orderId, customerId, surrogateId, mealId, authorizationDoc }
   */
  static async get(id) {
    const result = await db.query(
      `SELECT id, order_id AS "orderId", customer_id AS "customerId", surrogate_id AS "surrogateId",
                   meal_id AS "mealId", authorization_doc AS "authorizationDoc"
           FROM surrogates
           WHERE id = $1`,
      [id]
    );

    const surrogate = result.rows[0];
    if (!surrogate) throw new NotFoundError(`No surrogate order with id: ${id}`);

    return surrogate;
  }

  /** Delete a surrogate order
   * 
   * Returns { message: "Surrogate order deleted" }
   */
  static async remove(id) {
    const result = await db.query(
      `DELETE FROM surrogates
           WHERE id = $1
           RETURNING id`,
      [id]
    );

    const surrogate = result.rows[0];
    if (!surrogate) throw new NotFoundError(`No surrogate order with id: ${id}`);

    return { message: "Surrogate order deleted" };
  }
}

module.exports = Surrogate;
