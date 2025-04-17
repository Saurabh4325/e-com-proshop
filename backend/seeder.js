import User from "./models/userModel.js";
import users from "./data/users.js";
import products from "./data/products.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUser = await User.insertMany(users);
    const adminUser = createdUser[0]._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);

    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.log(`imported ERROR :: ${error}.red.inverse`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();
    process.exit();
  } catch (error) {
    console.log(`destroy ERROR : ${error}.red.inverse`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") destroyData();
else importData();
