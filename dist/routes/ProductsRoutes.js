"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProductsController_1 = __importDefault(require("../controllers/ProductsController"));
const router = (0, express_1.Router)();
router.post("/products", ProductsController_1.default.createProduct); // Crear un producto
router.get("/products", ProductsController_1.default.getAllProducts); // Obtener todos los productos
router.get("/products/:id", ProductsController_1.default.getProduct); // Obtener un producto por ID
router.put("/products/:id", ProductsController_1.default.updateProduct); // Actualizar un producto completamente
router.delete("/products/:id", ProductsController_1.default.deleteProduct); // Eliminar un producto
router.patch("/products/:id", ProductsController_1.default.partialUpdateProduct); // Actualizar parcialmente un producto
exports.default = router;
