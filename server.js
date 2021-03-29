import express from "express";
import mongoose from "mongoose";
import Products from "./products.js";
import Cors from "cors";
import Mobiles from "./products/mobiles.js";
import Users from "./user/user.js";
import Accessories from "./products/accessories.js";
import MensWear from "./products/mensWear.js";
import Orders from "./products/orders.js";
import { key } from "./stripe_key.js";
import Stripe from "stripe";
const stripe = Stripe(key);
//APP config

const app = express();
const port = process.env.PORT || 8001;

const connection_url =
  "mongodb+srv://admin:blV85jMz6Yo8vHt3@cluster0.bft6n.mongodb.net/shoppers?retryWrites=true&w=majority";
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

app.post("/mobiles", (req, res) => {
  const product = req.body;
  Mobiles.create(product, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/mobiles", (req, res) => {
  Mobiles.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});
app.post("/accessories", (req, res) => {
  const product = req.body;
  Accessories.create(product, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/accessories", (req, res) => {
  Accessories.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/menswear", (req, res) => {
  const product = req.body;
  MensWear.create(product, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/menswear", (req, res) => {
  MensWear.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/orders", (req, res) => {
  const order = req.body;
  Orders.create(order, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/orders", (req, res) => {
  Orders.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/user", (req, res) => {
  const user = req.body;
  Users.create(user, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});
app.get("/user/:uid", (req, res) => {
  const uid = req.params.uid;

  Users.find({ uid: uid }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;
  console.log("payment request recieved ", total);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // sub units of the currency
    currency: "inr",
  });
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.get("/orders/:uid", (req, res) => {
  const user_uid = req.params.uid;

  Orders.find({ uid: user_uid }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.get("/orders/orderid/:order_id", (req, res) => {
  const orderid = req.params.order_id;
  Orders.find({ orderId: orderid }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.put("/orders/:order_id", (req, res) => {
  const orderid = req.params.order_id;
  Orders.findOneAndUpdate({ orderId: orderid }, req.body, (err, data) => {
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
app.get("/:products/:product_id", (req, res) => {
  const product_id = req.params.product_id;
  Products.findById(product_id, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});
// app.get("/user/:uid", (req, res) => {
//   const uid = req.params.uid;

//   Users.find({ uid: uid }, (err, data) => {
//     if (err) {
//       res.status(500).send(err);
//     } else {
//       res.status(200).send(data);
//     }
//   });
// });

app.get("/products/:route/:product_id", (req, res) => {
  const product_id = req.params.product_id;
  const route = req.params.route;

  switch (route) {
    case "mobiles":
      // code block
      Mobiles.findById(product_id, (err, data) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).send(data);
        }
      });
      break;
    case "accessories":
      // code block
      Accessories.findById(product_id, (err, data) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).send(data);
        }
      });
      break;
    case "menswear":
      // code block
      MensWear.findById(product_id, (err, data) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).send(data);
        }
      });
      break;
  }
});

//Listener
app.listen(port, () => console.log(`listening on localhost : ${port}`));
