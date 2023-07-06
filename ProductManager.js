const fs = require('fs');
const path = require('path');

class ProductManager {
    constructor() {
        // Establece el path a "products.json"
        this.path = path.join(__dirname, 'products.json');
        this.products = [];
        this.loadProducts();
    }

    loadProducts() {
         // Carga los productos desde el archivo y los parsea con los datos del JSON
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            this.products = JSON.parse(data);
        } catch (error) {
            console.log('Error cargando productos:', error);
        }
    }
    saveProducts() {
        // Guarda los productos al archivo escribiendo los datos del JSON
        try {
            fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
            console.log('Productos guardados exitosamente.');
        } catch (error) {
            console.log('Error guardando productos:', error);
        }
    }

    getNextId() {
        // Encuentra el ID máximo de los existentes y crea el id próximo
        const maxId = this.products.reduce((max, product) => (product.id > max ? product.id : max), 0);
        return maxId + 1;
    }

    addProduct(productData) {
        // Crea un nuevo producto con el id auto incrementado
        const newProduct = {
            id: this.getNextId(),
            title: productData.title,
            description: productData.description,
            price: productData.price,
            thumbnail: productData.thumbnail,
            code: productData.code,
            stock: productData.stock,
        };
// Agrega el nuevo producto al array de productos y los guarda en el archivo
        this.products.push(newProduct);
        this.saveProducts();
    }

    getProducts() {
        // Devuelve todos los productos como un array
        return this.products;
    }

    getProductById(productId) {
         // Encuentra y devuelve el producto con el id especificado
        return this.products.find((product) => product.id === productId);
    }

    updateProduct(productId, updatedFields) {
        // Encuentra el producto con el ID especificado y actualiza el campo especificado
        const product = this.products.find((product) => product.id === productId);
        if (product) {
            Object.assign(product, updatedFields);
            this.saveProducts();
        }
    }

    deleteProduct(productId) {
        // Encuentra el producto con el id especificado y lo borra
        const index = this.products.findIndex((product) => product.id === productId);
        if (index !== -1) {
            this.products.splice(index, 1);
            this.saveProducts();
            console.log('Producto borrado exitosamente.');
        }
    }
}



