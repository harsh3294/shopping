import express from "express";
import mongoose from "mongoose";
import Products from "./products.js";
import Cors from "cors";
import Mobiles from "./products/mobiles.js";
//APP config

const app = express();
const port = process.env.PORT || 8001;
// gnxOlJnWEwODsJEd
const connection_url =
  "mongodb+srv://admin:enwKEfJIzcHDGn9h@cluster0.bft6n.mongodb.net/shoppers?retryWrites=true&w=majority";

//Middleware
app.use(express.json());
app.use(Cors());

//DB config
mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
//API endpoints
app.get("/", (req, res) => res.status(200).send("hello harsh 6da"));

app.post("/products", (req, res) => {
  const product = req.body;
  Products.create(product, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/products", (req, res) => {
  Products.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});
app.post("/products/mobiles", (req, res) => {
  const product = req.body;
  Mobiles.create(product, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/products/mobiles", (req, res) => {
  Mobiles.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});
app.get("/products/:product_id", (req, res) => {
  const product_id = req.params.product_id;
  Products.findById(product_id, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

//Listener
app.listen(port, () => console.log(` listening on localhost : ${port}`));
