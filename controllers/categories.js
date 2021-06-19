import Category from '../models/category.js';

exports.create = async (req, res, next) => {
    try {
        console.log(req.body);
        const category = await Category.findByName(req.body.category);
        console.log(category);
        if (category.length) {
            res.status(400).json({
                message: `The category already exists`
            });
        } else {
            let category = new Category({
                categoryName: req.body.category
            });

            const categoryData = await Category.create(category);
            if (categoryData) {
                res.status(201).json(categoryData);
            }
        }
    } catch (error) {
        console.log(error);

        next(error);
    }
};

exports.findAll = async (req, res, next) => {
    try {
        const categories = await Category.getAll();
        if (categories) {
            const data = categories.map((category) => {
                return { id: category.id, category: category.categoryName };
            });
            res.status(200).json(data);
        }
    } catch (error) {
        console.log(error);

        next(error);
    }
};

exports.findByName = async (req, res) => {
    try {
        const category = (await Category.findByName(req.params.category))[0];
        if (category) {
            const data = { id: category.id, category: category.categoryName };
            res.status(200).json(data);
        }
    } catch (error) {
        console.log(error);

        next(error);
    }
};

exports.findById = async (req, res) => {
    try {
        const category = (await Category.findById(req.params.id))[0];
        if (category) {
            const data = { id: category.id, category: category.categoryName };
            res.status(200).json(data);
        }
    } catch (error) {
        console.log(error);

        next(error);
    }
};
