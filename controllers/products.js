exports.products = (req, res, next) => {
    res.status(200).json({
        message: 'No products yet!'
    });
};

exports.searchProduct = (req, res, next) => {
    res.status(200).json({
        name: 'new Product',
        id: '2347',
        price: '560.78',
        qty: '45'
    });
};
