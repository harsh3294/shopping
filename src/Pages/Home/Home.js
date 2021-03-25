import React, { useEffect, useState } from "react";
import "./Home.css";
import axios from "../../axios";
import Loading from "../../images/Loading.gif";
function Home() {
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);
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
          </tr>
        ))}
      </table>
    </div>
  );
}

export default Home;
