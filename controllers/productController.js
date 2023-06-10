const Product = require("../models/Product");
const assert = require("assert");
const Definer = require("../lib/mistake");

let productController = module.exports;

productController.getAllProducts = async (req, res) => {
  try {
    console.log("GET: cont/getAllProducts");
  } catch (err) {
    console.log(`ERROR, cont/getAllProducts, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

productController.addNewProduct = async (req, res) => {
  try {
    console.log("POST: cont/addNewProduct");
    assert(req.files, Definer.general_err3);
    
    const product = new Product();
    let data = req.body;
    /* Image path req body ichida yo'q req files bn keladi */
    /* req files asosida array hosil qilib uni req body ga yozyapmiz */
    /* Yuklangan product imagelarni path  ini db ga yozish */
    data.product_images = req.files.map(ele => {
      return ele.path;
    });

    const result = await product.addNewProductData(data, req.member);
    const html = `<script>
                   alert(New dish added successfully);
                   window.location.replace('/resto/products/menu');
                 </script>`;
    res.end(html);

  } catch (err) {
    console.log(`ERROR, cont/addNewProduct, ${err.message}`);
  }
};

productController.updateChosenProduct = async (req, res) => {
  try {
    console.log("POST: cont/updateChosenProduct");
    const product = new Product();
    const id = req.params.id;
    const result = await product.updateChosenProductData(id, req.body, req.member._id);
    await res.json({ state: "success", data: result });
  } catch (err) {
    console.log(`ERROR, cont/updateChosenProduct, ${err.message}`);
    res.json({ state: "fail", mesage: err.message });
  }
};
