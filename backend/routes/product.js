const express = require("express");
const router = express.Router();

const ProductController = require("../controller/product");


router.get("", ProductController.getProducts);

router.get("/cart", ProductController.cartPoducts);
  
router.post("/:id", ProductController.selectedAddingProduct)

router.delete("/:id", ProductController.deleteSelectedProduct)

router.get("/:id", ProductController.getSelectedProduct);

module.exports = router;
