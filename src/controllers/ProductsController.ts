import { Request, Response } from "express";
import Products from '../models/Products';

const productController = {
  createProduct: async (req: Request, res: Response) => {
    try {
      const newProduct = await Products.create(req.body);
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },

  getAllProducts: async (req: Request, res: Response) => {
    try {
      const products = await Products.findAll();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },

  getProduct: async (req: Request, res: Response) => {
    try {
      const product = await Products.findByPk(req.params.id);
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ message: "Producto no encontrado" });
      }
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },

  updateProduct: async (req: Request, res: Response) => {
    try {
      const [updated] = await Products.update(req.body, { where: { id: req.params.id } });
      if (updated) {
        const updatedProduct = await Products.findByPk(req.params.id);
        res.status(200).json(updatedProduct);
      } else {
        res.status(404).json({ message: "Producto no encontrado" });
      }
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },

  deleteProduct: async (req: Request, res: Response) => {
    try {
      const deleted = await Products.destroy({ where: { id: req.params.id } });
      if (deleted) {
        res.status(200).json({ message: "Producto eliminado exitosamente" });
      } else {
        res.status(404).json({ message: "Producto no encontrado" });
      }
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },

  partialUpdateProduct: async (req: Request, res: Response) => {
    try {
      const product = await Products.findByPk(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Producto no encontrado" });
      }

      await Products.update(req.body, { where: { id: req.params.id } });

      const updatedProduct = await Products.findByPk(req.params.id);
      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },

  simulatePurchase: async (req: Request, res: Response) => {
  try {
    const purchases: { id: number; quantity: number }[] = req.body;

    if (!Array.isArray(purchases)) {
      return res.status(400).json({ message: "El cuerpo debe ser un arreglo de productos" });
    }

    const results = [];

    for (const purchase of purchases) {
      const product = await Products.findByPk(purchase.id);

      if (!product) {
        results.push({ id: purchase.id, error: "Producto no encontrado" });
        continue;
      }

      if (product.stock < purchase.quantity) {
        results.push({ id: purchase.id, error: "Stock insuficiente" });
        continue;
      }

      const newStock = product.stock - purchase.quantity;
      const newStatus = newStock === 0 ? "inactive" : product.status;

      await product.update({ stock: newStock, status: newStatus });

      results.push({
        id: purchase.id,
        message: "Compra realizada exitosamente",
        stock_restante: newStock,
        status: newStatus
      });
    }

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}
};




export default productController;
