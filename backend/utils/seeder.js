const Product = require('../models/productModel');
const dotenv = require('dotenv');
const connectDb = require('../config/db');

const products = require('../data/products.json');

dotenv.config({ path: ' backend/config/config.env' });

connectDb();

const seedProducts = async () => {
  try {
    await Product.deleteMany();
    console.log('Products Delete Success');
    await Product.insertMany(products);
    console.log('Products added');
    process.exit();
  } catch (error) {
    console.error(error.message);
    process.exit();
  }
};

seedProducts();
