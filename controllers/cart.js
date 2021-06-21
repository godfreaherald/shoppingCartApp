import { NotFound, InsufficientStock, BadRequest, ConnectionFailed } from '../utils/errors';
import Cart from '../models/cart.js';
import Product from '../models/product.js';

exports.addToCart = async (req, res, next) => {
    const requestData = req.body;

    try {
        if (requestData.quantity <= 0) {
            throw new BadRequest(`Cart items cannot be less than one. Your cart items quantity: ${requestData.quantity} `);
        }

        await Cart.setIsolationLevel();
        await Cart.beginTransaction();

        const ItemToAddToCart = await Product.findById(requestData.productId);

        await Product.LockTableBySKU(ItemToAddToCart.sku);

        const stockBalance = ItemToAddToCart[0].quantity - requestData.quantity;
        const sufficientStock = stockBalance >= 0 ? true : false;

        if (!sufficientStock) {
            throw new InsufficientStock(`The item you want to buy is out of stock`);
        }

        let newOrder = await Cart.fetchNewOrder(requestData.userId);

        if (!newOrder || !newOrder.length) {
            await Cart.createOrder(requestData.userId);
            newOrder = await Cart.fetchNewOrder(requestData.userId);
        }

        requestData.orderId = newOrder[0].id;

        const existing = await Cart.getExistingProductFromCart(requestData);

        if (existing && existing.length) {
            await Cart.updateCart({
                id: existing[0].id,
                quantity: requestData.quantity + existing[0].quantity,
                subTotal: requestData.subTotal + existing[0].subTotal
            });
        } else {
            const { orderId, quantity, productId, userId, subTotal } = requestData;
            const cart = new Cart({ orderId, quantity, productId, userId, subTotal });
            await Cart.createCart(cart);
        }

        // update order async
        const grandTotal = newOrder[0].grandTotal + requestData.subTotal;

        await Cart.updateOrder({
            id: requestData.orderId,
            grandTotal
        });

        await Product.UpdateProductQuantity(stockBalance, requestData.productId);

        Cart.commitTransaction();
        Cart.closeConnection();
        res.status(200).json({ message: `Cart Updated`, data: { cartId: existing[0].id, orderId: newOrder[0].id, cartTotal: grandTotal } });
    } catch (error) {
        Cart.rollBackTransaction();
        Cart.closeConnection();
        console.log(`err`, error);

        next(error);
    }
};

exports.removeFromCart = async (req, res, next) => {
    const requestData = req.body;
    let connection;
    try {
        if (requestData.quantity <= 0) {
            throw new BadRequest(`Cart items cannot be less than one. Your cart items quantity: ${requestData.quantity} `);
        }

        await Cart.setIsolationLevel();
        await Cart.beginTransaction();

        await Product.LockTableBySKU(ItemToAddToCart.sku);

        const existingCustomerCart = await Cart.getExistingProductFromCart(requestData);
        const cartBalance = existingCustomerCart[0].quantity - requestData.quantity;

        if (cartBalance < 0) {
            throw new InsufficientStock(`Your cart items are less than items to be  remove`);
        }

        const ItemToRemove = Product.findById(requestData.productId);
        const stockBalance = requestData.quantity + ItemToRemove[0].quantity;

        const cartItem = await Cart.fetchItemFromUsersCurrentCart(requestData.userId, requestData.productId);

        if (!cartItem || !cartItem.length) {
            throw NotFound(`Item not found in the cart`);
        }

        const cartPayload = {
            id: cartItem[0].id,
            quantity: cartItem[0].quantity - requestData.quantity > 0 ? cartItem[0].quantity - requestData.quantity : 0,
            subTotal: cartItem[0].subTotal - requestData.subTotal > 0 ? cartItem[0].subTotal - requestData.subTotal : 0
        };

        if (cartPayload.quantity > 0) {
            await Cart.updateCart(cartPayload);
        } else {
            await Cart.deleteFromCart(cartPayload.id);
        }

        const order = await Cart.fetchOrderById(cartItem[0].orderId);

        const grandTotal = order[0].grandTotal - requestData.subTotal > 0 ? order[0].grandTotal - requestData.subTotal : 0;
        const orderPayload = {
            id: order[0].id,
            grandTotal
        };

        await Cart.updateOrder(orderPayload);

        await Product.UpdateProductQuantity(stockBalance, requestData.productId);

        Cart.commitTransaction();
        Cart.closeConnection();

        res.status(200).json({ message: `success`, data: { cartId: cartPayload.id, orderId: orderPayload.id, cartTotal: grandTotal } });
    } catch (error) {
        try {
            Cart.rollBackTransaction();
            Cart.closeConnection();
            console.log(error);
            next(error);
        } catch (err) {
            console.log(err);
            next(err);
        }
    }
};
