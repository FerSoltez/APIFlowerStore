"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Products_1 = __importDefault(require("../models/Products"));
const productController = {
    createProduct: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newProduct = yield Products_1.default.create(req.body);
            res.status(201).json(newProduct);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    getAllProducts: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const products = yield Products_1.default.findAll();
            res.status(200).json(products);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    getProduct: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const product = yield Products_1.default.findByPk(req.params.id);
            if (product) {
                res.status(200).json(product);
            }
            else {
                res.status(404).json({ message: "Producto no encontrado" });
            }
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    updateProduct: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const [updated] = yield Products_1.default.update(req.body, { where: { id: req.params.id } });
            if (updated) {
                const updatedProduct = yield Products_1.default.findByPk(req.params.id);
                res.status(200).json(updatedProduct);
            }
            else {
                res.status(404).json({ message: "Producto no encontrado" });
            }
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    deleteProduct: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const deleted = yield Products_1.default.destroy({ where: { id: req.params.id } });
            if (deleted) {
                res.status(200).json({ message: "Producto eliminado exitosamente" });
            }
            else {
                res.status(404).json({ message: "Producto no encontrado" });
            }
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    partialUpdateProduct: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const product = yield Products_1.default.findByPk(req.params.id);
            if (!product) {
                return res.status(404).json({ message: "Producto no encontrado" });
            }
            yield Products_1.default.update(req.body, { where: { id: req.params.id } });
            const updatedProduct = yield Products_1.default.findByPk(req.params.id);
            res.status(200).json(updatedProduct);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
};
exports.default = productController;
