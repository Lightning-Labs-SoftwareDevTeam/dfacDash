"use strict";

const db = require("../db");
const { NotFoundError } = require("../expressError");

/** Intermediate table between orders and meals */
class OrderMeals {
  /** Find an entry in the order_meals table by ID
   *
   * Returns { id, orderId, mealId, quantity, priceAtOrder, specialInstructions, meal: {mealId, mealName, ...} }
   */
  static async get(id) {
    const result = await db.query(
      `SELECT om.id, om.order_id AS "orderId", om.meal_id AS "mealId", om.quantity, 
              om.price_at_order AS "priceAtOrder", om.special_instructions AS "specialInstructions",
              m.id AS "mealId", m.meal_name AS "mealName", m.description AS "mealDescription", 
              m.price AS "mealPrice"
       FROM order_meals AS om
       JOIN meals AS m ON om.meal_id = m.id
       WHERE om.id = $1`,
      [id]
    );

    const orderMeal = result.rows[0];
    if (!orderMeal) throw new NotFoundError(`No order meal with id: ${id}`);

    return orderMeal;
  }

  // Add other methods as needed for CRUD operations

}

module.exports = OrderMeals;

