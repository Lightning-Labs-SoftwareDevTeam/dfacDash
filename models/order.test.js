const { expect } = require("chai");
const db = require("../db");
const Order = require("../models/order");

describe("Order Model", () => {
  // Assuming you have a function to clear the database before each test
  beforeEach(async () => {
    await db.query("DELETE FROM orders");
  });

  describe("#create", () => {
    it("should create a new order", async () => {
      const orderData = {
        // Provide necessary data for creating an order
        // (orderId, customerId, mealId, quantity, etc.)
      };

      const order = await Order.create(orderData);

      expect(order).to.be.an("object");
      expect(order).to.have.property("orderId");
      // Add more assertions based on your model structure and data
    });
  });

  describe("#findAll", () => {
    it("should retrieve all orders", async () => {
      // Assuming you have inserted some orders into the database for testing
      // Use Order.create to insert test data

      const orders = await Order.findAll();

      expect(orders).to.be.an("array");
      // Add more assertions based on your model structure and test data
    });
  });

  describe("#get", () => {
    it("should retrieve a specific order by ID", async () => {
      // Assuming you have inserted a specific order into the database for testing
      // Use Order.create to insert test data

      const orderId = 1; // Replace with the actual ID of the order you want to retrieve
      const order = await Order.get(orderId);

      expect(order).to.be.an("object");
      expect(order).to.have.property("orderId");
      // Add more assertions based on your model structure and test data
    });

    it("should throw NotFoundError for non-existing order", async () => {
      const nonExistingOrderId = 999; // Replace with a non-existing ID
      try {
        await Order.get(nonExistingOrderId);
        // If the above line doesn't throw an error, fail the test
        expect.fail("Expected NotFoundError but got success");
      } catch (error) {
        expect(error.name).to.equal("NotFoundError");
        expect(error.message).to.equal(`No order with ID: ${nonExistingOrderId}`);
      }
    });
  });

  // Add more test cases for other functions in the Order model

  // ...

  after(async () => {
    // Optionally, close the database connection or perform cleanup after all tests
    await db.end();
  });
});
