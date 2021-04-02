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
import DeliveryUser from "./delivery-user.js";
import Delivery from "./delivery.js";
import OutForDelivery from "./outForDelivery.js";
import CaseCovers from "./products/casesCovers.js";
import HandbagClutches from "./products/handbagsclutches.js";
import Television from "./products/television.js";
import Makeup from "./products/makeup.js";
import Laptop from "./products/laptop.js";
import Desktop from "./products/desktop.js";

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

app.post("/case-covers", (req, res) => {
  const product = req.body;
  CaseCovers.create(product, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/case-covers", (req, res) => {
  CaseCovers.find((err, data) => {
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

app.post("/handbag-clutches", (req, res) => {
  const product = req.body;
  HandbagClutches.create(product, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/handbag-clutches", (req, res) => {
  HandbagClutches.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/television", (req, res) => {
  const product = req.body;
  Television.create(product, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/television", (req, res) => {
  Television.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/makeup", (req, res) => {
  const product = req.body;
  Makeup.create(product, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/makeup", (req, res) => {
  Makeup.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/laptop", (req, res) => {
  const product = req.body;
  Laptop.create(product, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/laptop", (req, res) => {
  Laptop.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/desktop", (req, res) => {
  const product = req.body;
  Desktop.create(product, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/desktop", (req, res) => {
  Desktop.find((err, data) => {
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

app.post("/delivery/user", (req, res) => {
  const user = req.body;
  DeliveryUser.create(user, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});
app.get("/delivery/user", (req, res) => {
  // const uid = req.params.uid;

  DeliveryUser.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/delivery", (req, res) => {
  const delivery = req.body;
  Delivery.create(delivery, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/delivery", (req, res) => {
  Delivery.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});
app.delete("/delivery/find/:orderid", (req, res) => {
  const orderid = req.params.orderid;
  Delivery.findOneAndRemove({ orderid: orderid }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/outfordelivery", (req, res) => {
  const order_out_for_delivery = req.body;
  OutForDelivery.create(order_out_for_delivery, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});
app.get("/outfordelivery", (req, res) => {
  // const uid = req.params.uid;

  OutForDelivery.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.get("/outfordelivery/user/:uid", (req, res) => {
  const uid = req.params.uid;

  OutForDelivery.find({ deliveryBoyUid: uid }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
      // console.log(data);
    }
  });
});
app.get("/outfordelivery/orderid/:orderid", (req, res) => {
  const orderid = req.params.orderid;

  OutForDelivery.find({ orderid: orderid }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
      // console.log(data);
    }
  });
});
app.delete("/outfordelivery/orderid/:orderid", (req, res) => {
  const orderid = req.params.orderid;

  OutForDelivery.remove({ orderid: orderid }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
      // console.log(data);
    }
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

app.put("/product/:category/:product_id", (req, res) => {
  const productid = req.params.product_id;
  const category = req.params.category;
  switch (category) {
    case "mobiles":
      // code block
      Mobiles.findByIdAndUpdate(productid, req.body, (err, data) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).send(data);
        }
      });
      break;
    case "accessories":
      // code block
      Accessories.findByIdAndUpdate(productid, req.body, (err, data) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).send(data);
        }
      });
    case "case-covers":
      // code block
      CaseCovers.findByIdAndUpdate(productid, req.body, (err, data) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).send(data);
        }
      });
      break;
    case "handbag-clutches":
      // code block
      HandbagClutches.findByIdAndUpdate(productid, req.body, (err, data) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).send(data);
        }
      });
      break;
    case "television":
      // code block
      Television.findByIdAndUpdate(productid, req.body, (err, data) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).send(data);
        }
      });
      break;
    case "makeup":
      // code block
      Makeup.findByIdAndUpdate(productid, req.body, (err, data) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).send(data);
        }
      });
      break;
    case "laptop":
      // code block
      Laptop.findByIdAndUpdate(productid, req.body, (err, data) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).send(data);
        }
      });
      break;
    case "desktop":
      // code block
      Desktop.findByIdAndUpdate(productid, req.body, (err, data) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).send(data);
        }
      });
      break;
    default:
      break;
  }
});

app.delete("/product/:category/:product_id", (req, res) => {
  const productid = req.params.product_id;
  const category = req.params.category;
  switch (category) {
    case "mobiles":
      // code block
      Mobiles.findByIdAndRemove(productid, (err, data) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).send(data);
        }
      });
      break;
    case "accessories":
      // code block
      Accessories.findByIdAndRemove(productid, (err, data) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).send(data);
        }
      });
      break;
    case "case-covers":
      // code block
      CaseCovers.findByIdAndRemove(productid, (err, data) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).send(data);
        }
      });
      break;
    case "handbag-clutches":
      // code block
      HandbagClutches.findByIdAndRemove(productid, (err, data) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).send(data);
        }
      });
      break;
    case "television":
      // code block
      Television.findByIdAndRemove(productid, (err, data) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).send(data);
        }
      });
      break;
    case "makeup":
      // code block
      Makeup.findByIdAndRemove(productid, (err, data) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).send(data);
        }
      });
      break;
    case "laptop":
      // code block
      Laptop.findByIdAndRemove(productid, (err, data) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).send(data);
        }
      });
      break;
    case "desktop":
      // code block
      Desktop.findByIdAndRemove(productid, (err, data) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).send(data);
        }
      });
      break;
    default:
      break;
  }
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
    case "case-covers":
      // code block
      CaseCovers.findById(product_id, (err, data) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).send(data);
        }
      });
      break;
    case "handbag-clutches":
      // code block
      HandbagClutches.findById(product_id, (err, data) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).send(data);
        }
      });
      break;
    case "television":
      // code block
      Television.findById(product_id, (err, data) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).send(data);
        }
      });
      break;
    case "makeup":
      // code block
      Makeup.findById(product_id, (err, data) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).send(data);
        }
      });
      break;
    case "laptop":
      // code block
      Laptop.findById(product_id, (err, data) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).send(data);
        }
      });
      break;
    case "desktop":
      // code block
      Desktop.findById(product_id, (err, data) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).send(data);
        }
      });
      break;
    default:
      break;
  }
});

//Listener
app.listen(port, () => console.log(`listening on localhost : ${port}`));
