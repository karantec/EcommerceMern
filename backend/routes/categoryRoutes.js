import express from "express";
import {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import validateRequest from "../middleware/validator.js";
import { check, param, body } from "express-validator";

const router = express.Router();

const validator = {
  getCategories: [
    check("limit")
      .optional()
      .isNumeric()
      .withMessage("Limit parameter must be a number")
      .custom((value) => {
        if (value < 0) throw new Error("Value should not be less than Zero");
        return true;
      }),
    check("skip")
      .optional()
      .isNumeric()
      .withMessage("skip parameter must be a number")
      .custom((value) => {
        if (value < 0) throw new Error("Value should not be less than Zero");
        return true;
      }),
    check("search").optional().trim().escape(),
  ],

  createCategory: [
    check("name").trim().notEmpty().withMessage("Name is required").escape(),
    check("image").notEmpty().withMessage("Image is required"),
  ],

  getCategory: [
    param("id")
      .notEmpty()
      .withMessage("Id is required")
      .isMongoId()
      .withMessage("Invalid Id Format"),
  ],

  updateCategory: [
    check("name").trim().notEmpty().withMessage("Name is required").escape(),
    check("image").notEmpty().withMessage("Image is required"),
    param("id")
      .notEmpty()
      .withMessage("Id is required")
      .isMongoId()
      .withMessage("Invalid Id Format"),
  ],

  deleteCategory: [
    param("id")
      .notEmpty()
      .withMessage("Id is required")
      .isMongoId()
      .withMessage("Invalid Id Format"),
  ],
};

router
  .route("/")
  .post(
    validator.createCategory,
    validateRequest,
    protect,
    admin,
    createCategory
  )
  .get(validator.getCategories, validateRequest, getCategories);

router
  .route("/:id")
  .get(validator.getCategory, validateRequest, getCategory)
  .put(
    validator.updateCategory,
    validateRequest,
    protect,
    admin,
    updateCategory
  )
  .delete(
    validator.deleteCategory,
    validateRequest,
    protect,
    admin,
    deleteCategory
  );

export default router;
