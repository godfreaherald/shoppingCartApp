import { NotFound } from '../utils/errors';
import Cart from '../models/cart.js';

exports.addToCart = async (req, res, next) => {
    try {
        const requestData = req.body;

        let newOrder = await Cart.fetchNewOrder(requestData.userId);

        if (!newOrder || !newOrder.length) {
            await Cart.createOrder(requestData.userId);
            newOrder = await Cart.fetchNewOrder(requestData.userId);
        }

        requestData.orderId = newOrder[0].id;
        const { orderId, quantity, productId, userId, subTotal } = requestData;
        const existing = await Cart.getExistingProductFromCart(requestData);

        if (existing && existing.length) {
            await Cart.updateCart({
                id: existing[0].id,
                quantity: requestData.quantity + existing[0].quantity,
                subTotal: requestData.subTotal + existing[0].subTotal
            });
        } else {
            const cart = new Cart({ orderId, quantity, productId, userId, subTotal });
            await Cart.createCart(cart);
        }

        // update order async
        const grandTotal = newOrder[0].grandTotal + requestData.subTotal;

        await Cart.updateOrder({
            id: requestData.orderId,
            grandTotal
        });

        res.status(200).json({ message: `Cart Updated`, data: { cartId: existing[0].id, orderId: newOrder[0].id, cartTotal: grandTotal } });
    } catch (error) {
        console.log(error);

        next(error);
    }
};

exports.removeFromCart = async (req, res, next) => {
    const requestData = req.body;
    try {
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

        res.status(200).json({ message: `success`, data: { cartId: cartPayload.id, orderId: orderPayload.id, cartTotal: grandTotal } });
    } catch (error) {
        console.log(error);

        next(error);
    }
};
