const db = require('../utils/db');

class Products {
    static async getAllProducts() {
        try {
            const query = 'SELECT * FROM "Products"';;
            const products = await db.any(query);
            return products;
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    }
}

class Categories {
    static async getAllCategories() {
        try {
            const query = 'SELECT * FROM "Categories"';;
            const categories = await db.any(query);
            return categories;
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    }

    static async getProductsOfCategory(CatID) {
        const allProducts = await Products.getAllProducts();
        let products = [];
        
        for (const product of allProducts){
            if (product.CatID === CatID){
                products.push(product);
            }
        }

        return products;
    }

    static async insertCategory(catName) {
        try {
            const maxCatIDQuery = 'SELECT MAX("CatID") FROM "Categories"';
            const maxCatIDResult = await db.one(maxCatIDQuery);
            const newCatID = (maxCatIDResult.max || 0) + 1;
            const insertQuery = 'INSERT INTO "Categories" ("CatID", "CatName") VALUES ($1, $2)';
            await db.any(insertQuery, [newCatID, catName]);
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    }

    static async removeCategory(catID) {
        try {
            const deleteQuery = 'DELETE FROM "Categories" WHERE "CatID" = $1';
            await db.any(deleteQuery, [catID]);
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    }

    static async editCategory(catID, newCatName) {
        try {
            const editQuery = 'UPDATE "Categories" SET "CatName" = $2 WHERE "CatID" = $1';
            await db.any(editQuery, [catID, newCatName]);
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    }
}

module.exports = {
    Products,
    Categories
};