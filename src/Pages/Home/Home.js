import React, { useEffect, useState } from "react";
import "./Home.css";
import axios from "../../axios";
import Loading from "../../images/Loading.gif";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 50,
  },
  selectEmpty: {
    marginTop: theme.spacing(1),
  },
}));
function Home() {
  const [orders, setOrders] = useState([]);
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [statusUpdate, setStatusUpdate] = useState(false);

  const handleChange = async (orderId, event, orderPlacedBy) => {
    console.log(orderId, "=", event.target.value);
    const req = await axios
      .put(`/orders/${orderId}`, { status: event.target.value })
      .then((res) => {
        console.log(res.status);
        setStatusUpdate(true);
      })
      .catch((error) => alert(error));
    if (event.target.value === 2) {
      const req2 = await axios
        .post(`/delivery`, { orderid: orderId, placedBy: orderPlacedBy })
        .then((res) => {
          console.log(res.status);
          // setStatusUpdate(true);
        })
        .catch((error) => alert(error));
    }
  };

  useEffect(() => {
    let unmounted = false;

    async function fetchData() {
      const req = await axios
        .get(`/orders`)
        .then((res) => {
          if (!unmounted) {
            console.log(res.data);
            setOrders(res.data);
          }
          setLoading(false);
          setStatusUpdate(false);
        })
        .catch((error) => alert(error));
    }
    fetchData();

    return () => {
      unmounted = true;
    };
  }, [statusUpdate]);
  if (loading) {
    return <img src={Loading} alt="loading" className="loading" />;
  }
  return (
    <div>
      <table>
        <tr>
          <th>Order Id</th>
          <th>Placed By</th>
          <th>Address</th>
          <th>Contact Number</th>
          <th>Order List</th>
          <th>Order Total</th>
          <th>Ordered Date</th>
          <th>Status</th>
        </tr>
        {orders
          .sort(function (a, b) {
            const orderA = a.orderId;
            const orderB = b.orderId;
            let comparsion = 0;
            if (orderA > orderB) {
              comparsion = 1;
            } else if (orderA < orderB) {
              comparsion = -1;
            }
            return comparsion;
          })
          .map(
            (order) =>
              order.status !== 4 && (
                <tr key={order._id}>
                  <td>{order?.orderId}</td>
                  <td>
                    {order?.placedBy[0]?.firstName}{" "}
                    {order?.placedBy[0]?.lastName}
                  </td>
                  <td>
                    {" "}
                    {order?.placedBy[0]?.address1} , {order?.placedBy[0]?.city}{" "}
                    , {order?.placedBy[0]?.zip} , {order?.placedBy[0]?.state} -{" "}
                    {order?.placedBy[0]?.country}
                  </td>
                  <td>{order?.placedBy[0]?.contactNumber}</td>
                  <td>
                    {order?.orderList.map((orderlist) => (
                      <ul>
                        <li>
                          {orderlist?.name} x {orderlist?.cartValue}{" "}
                          {orderlist?.size && <p> Size : {orderlist.size}</p>}
                          {orderlist?.color && (
                            <p> Color : {orderlist.color}</p>
                          )}
                        </li>
                      </ul>
                    ))}
                  </td>
                  <td>₹ {order?.orderTotal}</td>
                  <td>{order.date}</td>
                  <td>
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                    >
                      <InputLabel id="demo-simple-select-outlined-label">
                        Status
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={order?.status}
                        onChange={(event) =>
                          handleChange(order?.orderId, event, order?.placedBy)
                        }
                        label="Status"
                      >
                        <MenuItem value={0}>Pending</MenuItem>
                        <MenuItem value={1}>Out From The Warehouse</MenuItem>
                        <MenuItem value={2}>
                          Product have Reached to your city
                        </MenuItem>
                        <MenuItem value={3}>Out For Delivery</MenuItem>
                        <MenuItem value={4}>Delivered</MenuItem>
                      </Select>
                    </FormControl>
                    {/* <select
                value={order?.status}
                onChange={(event) => handleChange(order?.orderId, event)}
              >
                <option value="0">Pending</option>
                <option value="1">Out From The Warehouse</option>
                <option value="2">Product have Reached to your city</option>
                <option value="3">Out For Delivery</option>
                <option value="4">Delivered</option>
              </select> */}
                  </td>
                </tr>
              )
          )}
      </table>
    </div>
  );
}

export default Home;
