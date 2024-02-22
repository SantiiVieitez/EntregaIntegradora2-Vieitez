import { Router} from "express";
import upload from "../utils/upload.middleware.js";

import ProductsDAO from "../daos/products.dao.js";

const router = Router();
export default router;

router.delete("/carts/:cid/products/:pid", async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;

  try {
    await CartsDAO.removeProduct(cartId, productId);
    res.json({ status: "success" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/carts/:cid", async (req, res) => {
  const cartId = req.params.cid;
  const products = req.body;

  try {
    await CartsDAO.update(cartId, products);
    res.json({ status: "success" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/carts/:cid/products/:pid", async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const quantity = req.body.quantity;

  try {
    await CartsDAO.updateProductQuantity(cartId, productId, quantity);
    res.json({ status: "success" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/carts/:cid", async (req, res) => {
  const cartId = req.params.cid;

  try {
    await CartsDAO.removeAllProducts(cartId);
    res.json({ status: "success" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/:cid", async (req, res) => {
  const cartId = req.params.cid;

  try {
    const cart = await CartsDAO.getById(cartId);
    const populatedCart = await cart.populate("products").execPopulate();
    res.json({ status: "success", cart: populatedCart });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});





