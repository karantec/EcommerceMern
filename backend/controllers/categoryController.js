import Category from "../models/category.Model.js";
import { deleteFile } from "../utils/file.js";

// @desc    Fetch all categories
// @method  GET
// @route   /api/v1/categories?limit=2&skip=0
// @access  Public
const getCategories = async (req, res, next) => {
  try {
    const total = await Category.countDocuments();
    const maxLimit = process.env.PAGINATION_MAX_LIMIT || 50;
    const maxSkip = total === 0 ? 0 : total - 1;
    const limit = Number(req.query.limit) || maxLimit;
    const skip = Number(req.query.skip) || 0;
    const search = req.query.search || "";

    const categories = await Category.find({
      name: { $regex: search, $options: "i" },
    })
      .limit(limit > maxLimit ? maxLimit : limit)
      .skip(skip > maxSkip ? maxSkip : skip < 0 ? 0 : skip);

    if (!categories || categories.length === 0) {
      res.statusCode = 404;
      throw new Error("Categories not found!");
    }

    res.status(200).json({
      categories,
      total,
      maxLimit,
      maxSkip,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single category
// @method  GET
// @route   /api/v1/categories/:id
// @access  Public
const getCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);

    if (!category) {
      res.statusCode = 404;
      throw new Error("Category not found!");
    }

    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

// @desc    Create category
// @method  POST
// @route   /api/v1/categories
// @access  Private/Admin
const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    // prefer uploaded file if available
    const image = req.file ? req.file.path : req.body.image;

    if (!name) {
      res.statusCode = 400;
      throw new Error("Category name is required");
    }

    const category = new Category({
      name,
      image,
    });

    const createdCategory = await category.save();

    res.status(201).json({ message: "Category created", createdCategory });
  } catch (error) {
    next(error);
  }
};

// @desc    Update category
// @method  PUT
// @route   /api/v1/categories/:id
// @access  Private/Admin
const updateCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    const image = req.file ? req.file.path : req.body.image;

    const category = await Category.findById(req.params.id);

    if (!category) {
      res.statusCode = 404;
      throw new Error("Category not found!");
    }

    const previousImage = category.image;

    category.name = name || category.name;
    category.image = image || category.image;

    const updatedCategory = await category.save();

    if (previousImage && previousImage !== updatedCategory.image) {
      deleteFile(previousImage);
    }

    res.status(200).json({ message: "Category updated", updatedCategory });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete category
// @method  DELETE
// @route   /api/v1/categories/:id
// @access  Private/Admin
const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);

    if (!category) {
      res.statusCode = 404;
      throw new Error("Category not found!");
    }

    await Category.deleteOne({ _id: category._id });
    deleteFile(category.image);

    res.status(200).json({ message: "Category deleted" });
  } catch (error) {
    next(error);
  }
};

export {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
