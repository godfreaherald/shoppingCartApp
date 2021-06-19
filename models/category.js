import sql from './db.js';

// constructor
const Category = function (category) {
    this.categoryName = category.categoryName;
};

Category.create = async (newCategory) => {
    const category = await sql.query(`INSERT INTO categories SET ?`, newCategory);
    if (category) {
        return { id: category.insertId, category: newCategory.categoryName };
    }
};

Category.getAll = async () => {
    return await sql.query(`SELECT * FROM categories`);
};

Category.findByName = async (category) => {
    return await sql.query(`SELECT * FROM categories WHERE categoryName = '${category}'`);
};

Category.findById = async (id) => {
    return await sql.query(`SELECT * FROM categories WHERE id = '${id}'`);
};

export default Category;
