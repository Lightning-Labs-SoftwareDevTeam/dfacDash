const express = require("express");
const router = express.Router();
const Meal = require("../models/meal");

/** GET /meals
 * 
 * Returns list of all meals.
 * 
 * Authorization required: none
 * 
 * Returns { meals: [ { id, dfacID, mealName, description, type, price, imgPic, likes, createdAt, updatedAt }, ...] }
 */
router.get("/", async (req, res, next) => {
    try {
        const meals = await Meal.findAll();
        return res.json({ meals });
    } catch (err) {
        return next(err);
    }
});

/** GET /meals/:id
 * 
 * Returns information about a specific meal.
 * 
 * Authorization required: none
 * 
 * Returns { meal: { id, dfacID, mealName, description, type, price, imgPic, likes, createdAt, updatedAt } }
 */
router.get("/:id", async (req, res, next) => {
    try {
        const meal = await Meal.get(req.params.id);
        return res.json({ meal });
    } catch (err) {
        return next(err);
    }
});

/** POST /meals
 * 
 * Creates a new meal.
 * 
 * Authorization required: none
 * 
 * Accepts { dfacID, mealName, description, type, price, imgPic }
 * 
 * Returns { meal: { id, dfacID, mealName, description, type, price, imgPic, likes, createdAt, updatedAt } }
 */
router.post("/", async (req, res, next) => {
    try {
        const meal = await Meal.create(req.body);
        return res.status(201).json({ meal });
    } catch (err) {
        return next(err);
    }
});

/** PATCH /meals/:id
 * 
 * Updates information about a specific meal.
 * 
 * Authorization required: none
 * 
 * Accepts { mealName, description, type, price, imgPic, likes }
 * 
 * Returns { meal: { id, dfacID, mealName, description, type, price, imgPic, likes, createdAt, updatedAt } }
 */
router.patch("/:id", async (req, res, next) => {
    try {
        const meal = await Meal.update(req.params.id, req.body);
        return res.json({ meal });
    } catch (err) {
        return next(err);
    }
});

/** DELETE /meals/:id
 * 
 * "Soft" deletes a specific meal.
 * 
 * Authorization required: none
 * 
 * Returns { message: "Meal deleted" }
 */
router.delete("/:id", async (req, res, next) => {
    try {
        await Meal.remove(req.params.id);
        return res.json({ message: "Meal deleted" });
    } catch (err) {
        return next(err);
    }
});

module.exports = router;
