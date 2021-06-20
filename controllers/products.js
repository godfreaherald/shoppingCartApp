import Product from '../models/product.js';
import Category from '../models/category.js';
import User from '../models/user.js';
import { BadRequest } from '../utils/errors';

exports.create = async (req, res, next) => {
    try {
        const existingProductSku = await Product.findBySku(req.body);

        const validCategoryId = await Category.findById(req.body.categoryId);

        const validUserId = await User.findById(req.body.userId);

        if (existingProductSku.length) {
            throw new BadRequest(`Product exists with same sku`);
        } else if (!validCategoryId.length) {
            throw new BadRequest(`Invalid Category,category does not exist`);
        } else if (!validUserId.length) {
            throw new BadRequest(`Invalid User, user doesnt exist`);
        } else {
            let product = new Product({
                userId: req.body.userId,
                title: req.body.title,
                summary: req.body.summary,
                sku: req.body.sku,
                price: req.body.price,
                quantity: req.body.quantity,
                categoryId: req.body.categoryId,
                expirationDate: req.body.expirationDate
            });

            const productData = await Product.create(product);
            if (productData) {
                res.status(201).json(productData);
            }
        }
    } catch (error) {
        console.log(error);

        next(error);
    }
};

exports.findAll = async (req, res, next) => {
    try {
        const products = await Product.getAll();
        if (products) {
            const data = products.map((product) => {
                return Product.productDTO(product);
            });
            res.status(200).json(data);
        }
    } catch (error) {
        console.log(error);

        next(error);
    }
};

exports.findBySku = async (req, res) => {
    try {
        const product = (await Product.findBySku(req.params.sku))[0];
        if (product) {
            const data = Product.productDTO(product);
            res.status(200).json(data);
        }
    } catch (error) {
        console.log(error);

        next(error);
    }
};
