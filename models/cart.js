import sql from './db.js';

// constructor
const Cart = function (cartData) {
    this.userId = cartData.userId;
    this.quantity = cartData.quantity;
    this.productId = cartData.productId;
    this.subTotal = cartData.subTotal;
    this.orderId = cartData.orderId;
};

Cart.createOrder = async (userId) => {
    const order = {
        userId,
        grandTotal: 0,
        new: 1 //new order
    };
    return await sql.query(`INSERT INTO orders SET ?`, order);
};
Cart.updateOrder = async (data) => {
    const { grandTotal, id } = data;
    return await sql.query(`UPDATE orders SET grandTotal =? WHERE id =?`, [grandTotal, id]);
};

Cart.createCart = async (data) => {
    return await sql.query(`INSERT INTO cart SET ?`, data);
};

Cart.getAll = async () => {
    return await sql.query(`SELECT * FROM cart`);
};

Cart.findByCartId = async (cartId) => {
    return await sql.query(`SELECT * FROM cart WHERE id = '${cartId}'`);
};
Cart.fetchOrderById = async (orderId) => {
    return await sql.query(`SELECT * FROM orders WHERE id = '${orderId}'`);
};

Cart.fetchNewOrder = async (userId) => {
    return await sql.query(`SELECT * FROM orders WHERE userId = '${userId}' AND new=1`);
};

Cart.getExistingProductFromCart = async (data) => {
    return await sql.query(`SELECT id,quantity,subTotal FROM cart WHERE productId = '${data.productId}' AND orderId = '${data.orderId}'`);
};

Cart.updateCart = async (data) => {
    const { quantity, subTotal, id } = data;
    return await sql.query(`UPDATE cart SET quantity = ?,subTotal =? WHERE id =?`, [quantity, subTotal, id]);
};

Cart.fetchItemFromUsersCurrentCart = async (userId, productId) => {
    return await sql.query(`SELECT id,quantity,subTotal,orderId FROM cart WHERE userId = '${userId}' AND productId = '${productId}'`);
};

Cart.deleteFromCart = async (cartId) => {
    return await sql.query(`delete from cart WHERE id = '${cartId}'`);
};

export default Cart;
