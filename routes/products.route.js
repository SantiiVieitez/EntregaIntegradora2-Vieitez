import { Router} from "express";
import upload from "../utils/upload.middleware.js";

import ProductsDAO from "../daos/products.dao.js";

const router = Router();
export default router;

// /products -> Muestro todos los productos
// /products?stock -> Muestre todos los productos con stock
router.get("/", async (req, res) => {
    // Obtener los parámetros de la consulta
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const sort = req.query.sort || "asc";
    const query = req.query.query;
    const category = req.query.category;
    const available = req.query.available;
  
    // Obtener la lista de productos
    let products;
    if (query) {
      products = await ProductsDAO.search(query, limit, page, sort, category, available);
    } else {
      products = await ProductsDAO.getAll(limit, page, sort, category, available);
    }
  
    // Calcular la información de paginación
    const totalPages = Math.ceil(products.total / limit);
    const prevPage = page > 1 ? page - 1 : null;
    const nextPage = page < totalPages ? page + 1 : null;
    const hasPrevPage = prevPage !== null;
    const hasNextPage = nextPage !== null;
    const prevLink = hasPrevPage ? `/products?page=${prevPage}` : null;
    const nextLink = hasNextPage ? `/products?page=${nextPage}` : null;
  
    // Generar la respuesta
    const response = {
      status: "success",
      payload: {
        products,
      },
      totalPages,
      prevPage,
      nextPage,
      page,
      hasPrevPage,
      hasNextPage,
      prevLink,
      nextLink,
    };
  
    // Enviar la respuesta
    res.json(response);
  });

// /products/new
router.get("/new", (req, res) => {
    res.render("new-product",{style:"css/new-product.css"});
})
// getbyid
router.get("/:id", async (req, res) => {

    let id = req.params.id;

    if(!id){
        res.redirect("/products/");
    }

    let product = await ProductsDAO.getById(id);

    if(!product){
        res.render("404");
    }

    res.render("product",{
        style:"css/product.css",
        title:product.title,
        description: product.description,
        photo: product.photo,
        price: product.price,
        isStock: product.stock > 0,
        
    });

});

// agregar producto
router.post("/", upload.single('image'), async (req, res) => {

    let filename = req.file.filename; // 17071
    let product = req.body;

    await ProductsDAO.add(product.title, product.description, filename, product.price, product.stock);

    res.redirect("/products");

})



