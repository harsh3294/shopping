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

  const handleChange = (orderId, event) => {
    console.log(orderId, "=", event.target.value);
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
        })
        .catch((error) => alert(error));
    }
    fetchData();

    return () => {
      unmounted = true;
    };
  }, []);
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
          <th>Ordered Date</th>
          <th>Status</th>
        </tr>
        {orders.map((order) => (
          <tr>
            <td>{order?.orderId}</td>
            <td>
              {order?.placedBy[0]?.firstName} {order?.placedBy[0]?.lastName}
            </td>
            <td>
              {" "}
              {order?.placedBy[0]?.address1} , {order?.placedBy[0]?.city} ,{" "}
              {order?.placedBy[0]?.zip} , {order?.placedBy[0]?.state} -{" "}
              {order?.placedBy[0]?.country}
            </td>
            <td>{order?.placedBy[0]?.contactNumber}</td>
            <td>
              {order?.orderList.map((orderlist) => (
                <ul>
                  <li>
                    {orderlist?.name} x {orderlist?.cartValue}
                  </li>
                </ul>
              ))}
            </td>
            <td>{order.date}</td>
            <td>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">
                  Status
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={order?.status}
                  onChange={(event) => handleChange(order?.orderId, event)}
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
        ))}
      </table>
    </div>
  );
}

export default Home;
