const { expect } = require("chai");
const Surrogate = require("../models/surrogate");

describe("Surrogate Model", function () {
  describe("create", function () {
    it("creates a new surrogate order", async function () {
      const surrogateData = {
        orderId: 1,
        customerId: 2,
        surrogateId: "some_surrogate_id",
        mealId: 3,
        authorizationDoc: "some_authorization_doc",
      };

      const surrogate = await Surrogate.create(surrogateData);

      expect(surrogate).to.include(surrogateData);
    });
  });

  describe("findAll", function () {
    it("returns an array of surrogate orders", async function () {
      const surrogateOrders = await Surrogate.findAll();

      expect(surrogateOrders).to.be.an("array");
    });
  });

  describe("get", function () {
    it("returns a specific surrogate order by ID", async function () {
      // Assuming you have a surrogate order ID available for testing
      const surrogateId = 1;

      const surrogate = await Surrogate.get(surrogateId);

      expect(surrogate).to.have.property("id", surrogateId);
    });

    it("throws NotFoundError if surrogate order ID not found", async function () {
      // Assuming you have a non-existing surrogate order ID for testing
      const nonexistentSurrogateId = 999;

      // Ensure this test case throws a NotFoundError
      await expect(Surrogate.get(nonexistentSurrogateId)).to.be.rejectedWith(
        "No surrogate order with id"
      );
    });
  });

  describe("remove", function () {
    it("removes a specific surrogate order by ID", async function () {
      // Assuming you have a surrogate order ID available for testing
      const surrogateId = 1;

      const result = await Surrogate.remove(surrogateId);

      expect(result).to.deep.equal({ message: "Surrogate order deleted" });
    });

    it("throws NotFoundError if surrogate order ID not found", async function () {
      // Assuming you have a non-existing surrogate order ID for testing
      const nonexistentSurrogateId = 999;

      // Ensure this test case throws a NotFoundError
      await expect(Surrogate.remove(nonexistentSurrogateId)).to.be.rejectedWith(
        "No surrogate order with id"
      );
    });
  });
});
