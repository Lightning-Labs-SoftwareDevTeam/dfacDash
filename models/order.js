"use strict";

const db = require('../db');
const { sqlForPartialUpdate } = require('../helpers/sql');
const {
    NotFoundError,
    BadRequestError,
} = require('../expressError');

class Order {
    /**
     * Create a new order.
     * @param {integer} customerId - The ID of the customer placing the order.
     * @param {integer} dfacId - The ID of the DFAC for which the order is placed.
     * @param {string} comments - Additional comments for the order.
     * @param {boolean} toGo - Indicates if the order is for takeout.
     * @param {boolean} favorite - Indicates if the order is marked as a favorite.
     * @returns {Promise<Object>} - The created order.
     */
    static async createOrder(customerId, dfacId, comments, toGo = null, favorite) {
        const result = await db.query(
            `INSERT INTO orders
                (customer_id, dfac_id, comments, to_go, favorite)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING *`,
            [customerId, dfacId, comments, toGo, favorite]
        );
        return result.rows[0];
    }

    /**
     * Get all orders in the database.
     * @returns {Promise<Array>} - An array of all orders.
     */
    static async getAllOrders() {
        const result = await db.query('SELECT * FROM orders');
        return result.rows;
    }

    /**
     * Delete an existing order.
     * @param {integer} orderId - The ID of the order to delete.
     * @returns {Promise<Object>} - The deleted order.
     */
    static async remove(orderID) {
        let result = await db.query(
            `UPDATE orders
             SET deleted_at = CURRENT_TIMESTAMP
             WHERE id = $1
             RETURNING id AS "orderID"`,
            [orderID]
        );
    
        const order = result.rows[0];
        if (!order) throw new NotFoundError(`No order: ${orderID}`);
    
        return order;
    }

    /**
     * Update the status of an order.
     * @param {integer} orderId - The ID of the order to update.
     * @param {Object} updates - The updates to apply (e.g., { readyForPickup: new Date() }).
     * @returns {Promise<Object>} - The updated order.
     */
    static async updateOrderStatus(orderId, updates) {
        const { setCols, values } = sqlForPartialUpdate(updates);
        const querySql = `UPDATE orders
                            SET ${setCols}
                            WHERE id = $1
                            RETURNING *`;
        const result = await db.query(querySql, [...values, orderId]);

        return result.rows[0];
    }
}

module.exports = Order;
