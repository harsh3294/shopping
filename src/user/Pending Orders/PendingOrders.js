import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import axios from "../../axios";
import Loading from "../../assets/images/Loading.gif";
import "./PendingOrders.css";
import PendingOrder from "./PendingOrder";
function PendingOrders() {
  const [ordersDetail, setOrdersDetail] = useState([]);
  const user = useSelector(selectUser);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let unmounted = false;

    async function fetchData() {
      const req = await axios
        .get(`/orders/${user?.uid}`)
        .then((res) => {
          if (!unmounted) {
            console.log(res.data);
            setOrdersDetail(res.data);
          }
          setLoading(false);
        })
        .catch((error) => alert(error));
    }
    fetchData();

    return () => {
      unmounted = true;
    };
  }, [user]);
  if (loading) {
    return <img src={Loading} alt="loading" className="loading" />;
  }
  return (
    <div className="pendingorders__main">
      <div className="pendingorders__heading">Your Orders</div>
      <div className="pendingorders__order">
        {ordersDetail?.map(
          (order) => order?.status !== 4 && <PendingOrder order={order} />
        )}
      </div>
    </div>
  );
}

export default PendingOrders;
