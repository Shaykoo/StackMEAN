const Product = require("../models/product");
const selectedProduct = require("../models/selectedProducts");
const checkAuth = require("../middleware/check-auth");
const selectedProducts = require("../models/selectedProducts");


exports.getProducts = (req, res, next) => {
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
}


exports.cartPoducts = (req, res, next) => {
    const productQuery = selectedProduct.find();
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
    }

exports.selectedAddingProduct = (req, res, next)=> {
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
  }

  exports.deleteSelectedProduct = (req, res, next)=> {
    selectedProduct.deleteOne({ _id: req.params.id })
    .then((result)=> {
      console.log('result',result)
      if (result.n > 0) {
        res.status(200).json({
          message: "Selected Product Deleted Successfully",
          productID: req.params.id 
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
  }

    exports.getSelectedProduct = (req, res, next) => {
    console.log("wow", req.params.id)
    Product.findById(req.params.id, (err, product)=> {
        if (err){ 
            console.log(err); 
            res.status(500).json({
            message: "Fetching product failed!"
        });
    } 
    else{ 
        res.status(200).json(product);
        console.log("Result : ", product); 
    }
    })
  
  }