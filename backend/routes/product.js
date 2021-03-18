const express = require("express");
const multer = require("multer");

const Product = require("../models/product");
const selectedProduct = require("../models/selectedProducts");
const checkAuth = require("../middleware/check-auth");
const selectedProducts = require("../models/selectedProducts");

const router = express.Router();

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};

router.get("", (req, res, next) => {
  console.log("Tame Impala LIVE");
//   const pageSize = +req.query.pagesize;
//   const currentPage = +req.query.page;
//   if (pageSize && currentPage) {
//     postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
//   }

const productQuery = Product.find();
let fetchedProducts;
productQuery
    .then(documents => {
        fetchedProducts = documents;
      return Product.count();
    })
    .then(count => {
      res.status(200).json({
        message: "Products fetched successfully!",
        products: fetchedProducts.map((product)=> {
          return {
            name: product.name,
            description: product.description,
            price: product.price,
            image: product.image,
            id: product._id,
            featuredImage: product.featuredImage,
            sizes: product.sizes 
          }
        }),
        maxProducts: count
      });
      console.log("fetched", fetchedProducts)
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching products failed!"
        
      });
      console.log("failed")
    });
});

router.post("/:id", (req, res, next)=> {
  const selectedProduct = new selectedProducts({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: req.body.image,
        featuredImage: req.body.featuredImage,
        sizes: req.body.sizes,
        selectedSize : req.body.selectedSize 
  })
    console.log("selec", selectedProduct);
    selectedProduct.save()
    .then(selectedProd => {
        res.status(201).json({
          message: "Selected Product Added Successfully",
          product: {
            selectedProd
            // ...selectedProduct,
            // id: selectedProduct._id
          }
        });
      })
      .catch(error => {
        let message = 'Unable to add to cart!';
        if(error.errors.selectedSize){
          message = "Please select a size."
        } 
        res.status(500).json({
          message: message
        });
      });
})

router.delete("/:id", (req, res, next)=> {
  selectedProduct.deleteOne({ _id: req.params.id })
  .then((result)=> {
    console.log('result',result)
    if (result.n > 0) {
      res.status(200).json({
        message: "Selected Product Deleted Successfully"
      })
    } else {
      res.status(400).json({ message: "Not authorized!" });
    }
    
  })
  .catch((error)=> {
    res.status(500).json({
      message: "Selected Product Deletion Failed"
    });
  })
})

// router.get("/:id", (req, res, next) => {
//   Post.findById(req.params.id)
//     .then(post => {
//       if (post) {
//         res.status(200).json(post);
//       } else {
//         res.status(404).json({ message: "Post not found!" });
//       }
//     })
//     .catch(error => {
//       res.status(500).json({
//         message: "Fetching post failed!"
//       });
//     });
// });

module.exports = router;
