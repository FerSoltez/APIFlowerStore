import { Router } from "express";
import productsController from '../controllers/ProductsController';

const router = Router();

router.post("/products", productsController.createProduct); // Crear un producto
router.get("/products", productsController.getAllProducts); // Obtener todos los productos
router.get("/products/:id", productsController.getProduct); // Obtener un producto por ID
router.put("/products/:id", productsController.updateProduct); // Actualizar un producto completamente
router.delete("/products/:id", productsController.deleteProduct); // Eliminar un producto
router.patch("/products/:id", productsController.partialUpdateProduct as any); // Actualizar parcialmente un producto

export default router;
