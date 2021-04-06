import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import "./DisplayOrders.css";
import axios from "../../axios";
import Loading from "../../images/Loading.gif";
import { Button, IconButton } from "@material-ui/core";
import NextWeekIcon from "@material-ui/icons/NextWeek";
import { useHistory } from "react-router";
function DisplayOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(false);
  const user = useSelector(selectUser);
  const history = useHistory();
  useEffect(() => {
    let unmounted = false;

    async function fetchData() {
      const req = await axios
        .get(`/outfordelivery/user/${user.uid}`)
        .then((res) => {
          if (!unmounted) {
            console.log(res.data);
            setOrders(res.data);
          }
          setLoading(false);
          setStatus(false);
        })
        .catch((error) => alert(error));
    }
    fetchData();

    return () => {
      unmounted = true;
    };
  }, [status]);

  const handleClick = (event, orderid) => {
    event.preventDefault();
    console.log(orderid);
    const req = axios
      .delete(`/outfordelivery/orderid/${orderid}`)
      .then((res) => {
        console.log(res.data);
        // alert("Delivered");
      })
      .catch((error) => alert(error));
    const req1 = axios
      .put(`/orders/${orderid}`, { status: 4 })
      .then((res) => {
        console.log(res.data);
        // alert("Updated");
      })
      .catch((error) => alert(error));
    setStatus(true);
  };

  const handleDelivery = (event, orderid) => {
    event.preventDefault();
    history.push(`/order/${orderid}`);
  };
  if (loading) {
    return <img src={Loading} alt="loading" className="loading" />;
  }
  return (
    <div>
      <table>
        <tr>
          <th>Order Id</th>
          <th>Address</th>
          <th>Contact Number</th>
          <th>Delivered</th>
        </tr>
        {orders.map((order) => (
          <tr>
            <td>{order.orderid}</td>
            <td>
              {" "}
              {order?.placedBy[0]?.address1} , {order?.placedBy[0]?.city} ,{" "}
              {order?.placedBy[0]?.zip} , {order?.placedBy[0]?.state} -{" "}
              {order?.placedBy[0]?.country}
            </td>
            <td>{order?.placedBy[0]?.contactNumber}</td>
            <td>
              {/* <Button
                onClick={(event) => {
                  handleClick(event, order.orderid);
                }}
              >
                Delivered
              </Button> */}
              <Button onClick={(event) => handleDelivery(event, order.orderid)}>
                Delivered
              </Button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default DisplayOrders;
