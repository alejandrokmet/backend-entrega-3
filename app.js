const express = require('express');
const {ProductManager} = require('./ProductManager');

const app = express();
const port = 3000;

// Middleware que parsea JSON
app.use(express.json());

// Obtiene todos los productos
app.get('/products', async (req, res) => {
    try {
        const {
            limit
        } = req.query;
        let products = productManager.getProducts();

        if (limit) {
            const parsedLimit = parseInt(limit, 10);
            if (!isNaN(parsedLimit)) {
                products = products.slice(0, parsedLimit);
            }
        }

        res.json(products);
    } catch (error) {
        res.status(500).json({
            error: 'Error recuperando productos'
        });
    }
});

// Obtiene productos por ID
app.get('/products/:pid', async (req, res) => {
    try {
        const {
            pid
        } = req.params;
        const productId = parseInt(pid, 10);

        if (isNaN(productId)) {
            res.status(400).json({
                error: 'ID de producto inválido'
            });
        } else {
            const product = productManager.getProductById(productId);
            if (product) {
                res.json(product);
            } else {
                res.status(404).json({
                    error: 'Producto no encontrado'
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            error: 'Error recibiendo producto'
        });
    }
});

app.listen(port, () => {
    console.log(`El server está corriendo en el puerto ${port}`);
});