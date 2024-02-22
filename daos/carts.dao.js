import Cart from '../schemas/cart.schema.js';

class CartsDAO {
  static async getAll() {
    try {
      return await Cart.find().lean();
    } catch (error) {
      console.error("Error in getAll:", error);
      throw error;
    }
  }

  static async getById(id) {
    try {
      return await Cart.findById(id).populate('products').exec();
    } catch (error) {
      console.error("Error in getById:", error);
      throw error;
    }
  }

  static async addProduct(cartId, productId, quantity) {
    try {
      const cart = await Cart.findById(cartId);
      await cart.addProduct(productId, quantity);
      return await cart.save();
    } catch (error) {
      console.error("Error in addProduct:", error);
      throw error;
    }
  }

  static async removeProduct(cartId, productId) {
    try {
      const cart = await Cart.findById(cartId);
      await cart.removeProduct(productId);
      return await cart.save();
    } catch (error) {
      console.error("Error in removeProduct:", error);
      throw error;
    }
  }

  static async updateProductQuantity(cartId, productId, quantity) {
    try {
      const cart = await Cart.findById(cartId);
      await cart.updateProductQuantity(productId, quantity);
      return await cart.save();
    } catch (error) {
      console.error("Error in updateProductQuantity:", error);
      throw error;
    }
  }

  static async removeAllProducts(cartId) {
    try {
      const cart = await Cart.findById(cartId);
      await cart.removeAllProducts();
      return await cart.save();
    } catch (error) {
      console.error("Error in removeAllProducts:", error);
      throw error;
    }
  }
}

export default CartsDAO;