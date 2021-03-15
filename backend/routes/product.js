const express = require("express");
const multer = require("multer");

const Product = require("../models/product");
const checkAuth = require("../middleware/check-auth");

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
  const productQuery = Product.find();
  
  

  let fetchedProducts;
//   if (pageSize && currentPage) {
//     postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
//   }
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
            featuredImage: product.featuredImage 
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

// router.post("", (req, res, next)=> {
//     const product = new Product({
//         name: "Black Tee Star",
//         description: "100% cotton, heavy weight",
//         price: 888,
//         image: "https://i.pinimg.com/564x/36/61/c7/3661c7ced4d11db54d9ae7a3e2782959.jpg"
//     });
//     product.save()
//     .then(createdProduct => {
//         res.status(201).json({
//           message: "Product added successfully",
//           post: {
//             ...createdProduct,
//             id: createdProduct._id
//           }
//         });
//       })
//       .catch(error => {
//         res.status(500).json({
//           message: "Creating a product failed!"
//         });
//       });
// })

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
