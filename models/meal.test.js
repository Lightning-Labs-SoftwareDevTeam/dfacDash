"use strict";

const { NotFoundError } = require("../expressError");
const db = require("../db");
const Meal = require("./meal");

beforeAll(async () => {
  // Set up any necessary database connections or configurations
  // This may include creating a test database or migrating data
});

afterAll(async () => {
  // Clean up any resources, close connections, or perform any necessary teardown
});

beforeEach(async () => {
  // Set up or reset data before each test
  // This may include inserting test data into the database
});

afterEach(async () => {
  // Clean up or reset data after each test
  // This may include deleting test data from the database
});

describe("Meal model", () => {
  test("create a new meal", async () => {
    const newMeal = await Meal.create({
      mealName: "Test Meal",
      description: "This is a test meal",
      price: 9.99,
    });

    expect(newMeal.mealName).toBe("Test Meal");
    expect(newMeal.description).toBe("This is a test meal");
    expect(newMeal.price).toBe(9.99);
  });

  test("get all meals", async () => {
    const meals = await Meal.findAll();

    expect(meals).toBeDefined();
    expect(meals.length).toBeGreaterThan(0);
  });

  test("get a meal by ID", async () => {
    const allMeals = await Meal.findAll();
    const testMealId = allMeals[0].id;

    const meal = await Meal.get(testMealId);

    expect(meal).toBeDefined();
    expect(meal.id).toBe(testMealId);
  });

  test("get a non-existent meal by ID should throw NotFoundError", async () => {
    const nonExistentMealId = -1;

    await expect(Meal.get(nonExistentMealId)).rejects.toThrowError(NotFoundError);
  });

  test("update a meal by ID", async () => {
    const allMeals = await Meal.findAll();
    const testMealId = allMeals[0].id;

    const updatedMeal = await Meal.update(testMealId, { price: 12.99 });

    expect(updatedMeal).toBeDefined();
    expect(updatedMeal.id).toBe(testMealId);
    expect(updatedMeal.price).toBe(12.99);
  });

  test("update a non-existent meal by ID should throw NotFoundError", async () => {
    const nonExistentMealId = -1;

    await expect(Meal.update(nonExistentMealId, { price: 12.99 })).rejects.toThrowError(NotFoundError);
  });

  test("remove a meal by ID", async () => {
    const allMeals = await Meal.findAll();
    const testMealId = allMeals[0].id;

    const deletedMeal = await Meal.remove(testMealId);

    expect(deletedMeal).toBeDefined();
    expect(deletedMeal.id).toBe(testMealId);
  });

  test("remove a non-existent meal by ID should throw NotFoundError", async () => {
    const nonExistentMealId = -1;

    await expect(Meal.remove(nonExistentMealId)).rejects.toThrowError(NotFoundError);
  });
});
