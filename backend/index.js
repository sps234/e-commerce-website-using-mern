const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const cors = require("cors");
const path = require("path");

app.use(express.static(path.join(__dirname, "client/build")));


mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());
app.use("/backend/auth", authRoute);
app.use("/backend/users", userRoute);
app.use("/backend/products", productRoute);
app.use("/backend/carts", cartRoute);
app.use("/backend/orders", orderRoute);
app.use("/backend/checkout", stripeRoute);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});



app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running!");
});
