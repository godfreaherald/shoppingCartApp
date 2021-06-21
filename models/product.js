import sql from './db.js';

// constructor
const Product = function (product) {
    this.userId = product.userId;
    this.title = product.title;
    this.summary = product.summary;
    this.sku = product.sku;
    this.price = product.price;
    this.quantity = product.quantity;
    this.categoryId = product.categoryId;
    this.expirationDate = product.expirationDate;
};

Product.create = async (newproduct) => {
    const product = await sql.query(`INSERT INTO products SET ?`, newproduct);
    if (product) {
        const { title, sku, price, quantity } = newproduct;
        return { id: product.insertId, title, sku, price, quantity };
    }
};

Product.getAll = async () => {
    return await sql.query(`SELECT * FROM products`);
};

Product.findBySku = async (sku) => {
    return await sql.query(`SELECT * FROM products WHERE sku = '${sku}'`);
};
Product.LockTableBySKU = async (sku) => {
    //Lock the products Table row by SKU column
    await sql.execute(`SELECT id, title FROM products WHERE sku = '${sku}' FOR UPDATE`);
};

Product.findById = async (id) => {
    return await sql.query(`SELECT * FROM products WHERE id = '${id}'`);
};

Product.UpdateProductQuantity = async (quantity, producId) => {
    return await sql.execute(`UPDATE products SET quantity = ? WHERE id =?`, [quantity, producId]);
};

Product.productDTO = function productDTO(product) {
    return {
        id: product.id,
        userId: product.userId,
        title: product.title,
        summary: product.summary,
        sku: product.sku,
        price: product.price,
        quantity: product.quantity,
        categoryId: product.categoryId,
        expirationDate: product.expirationDate
    };
};

export default Product;
