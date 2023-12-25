const {Categories} = require('../models/product.m');

class CategoryController{
    static async getAllProducts(req, res) {
        try {
            const categories = await Categories.getAllCategories();
            let result = [];

            for (const category of categories) {
                const products = await Categories.getProductsOfCategory(category.CatID);
                result.push({
                    Category: category,
                    Products: products
                })
            }

            return result;
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static async insertCategory(catName) {
        try {
            await Categories.insertCategory(catName);
        } catch (error) {
            console.error(error.message);
        }
    }

    static async removeCategory(catID) {
        try {
            await Categories.removeCategory(catID);
        } catch (error) {
            console.error(error.message);
        }
    }

    static async editCategory(catID, newCatName) {
        try {
            await Categories.editCategory(catID, newCatName);
        } catch (error) {
            console.error(error.message);
        }
    }
};

module.exports = {
    CategoryController
};
