import React, { useState, useEffect } from "react";
import "./Order.css";
import { Button } from "@material-ui/core";
import { useHistory, useParams } from "react-router";
import { firebase } from "../../firebase";
import Loading from "../../images/Loading.gif";
import axios from "../../axios";

function Order() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [requestId, setRequestId] = useState({});
  const { orderid } = useParams();
  const [otpInput, setOtpInput] = useState("");
  const [verifyotpfield, setVerifyotpfield] = useState(false);
  const [verifiedOtp, setVerifiedOtp] = useState(false);
  const history = useHistory();
  useEffect(() => {
    let unmounted = false;

    async function fetchData() {
      const req = await axios
        .get(`/outfordelivery/orderid/${orderid}`)
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

  const generateOtp = (event, contactnumber) => {
    console.log(contactnumber);
    const req = axios
      .get(`/sendOtp?phonenumber=${contactnumber}&channel=sms`)
      .then((res) => {
        console.log(res.data);
        setVerifyotpfield(true);
      })
      .catch((error) => alert(error));
  };

  const verifyOtp = (event, contactnumber) => {
    console.log(contactnumber);
    console.log(otpInput);
    const req = axios
      .get(`/verify?phonenumber=${contactnumber}&otp=${otpInput}`)
      .then((res) => {
        console.log(res.data);
        setVerifiedOtp(true);
      })
      .catch((error) => alert(error));
  };

  const deliveredHandleChange = (event) => {
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
        history.push("/");
      })
      .catch((error) => alert(error));
  };

  if (loading) {
    return <img src={Loading} alt="loading" className="loading" />;
  }
  return (
    <div>
      {orders.map((order) => (
        <div className="box-border-item">
          <h1>Order id : {order.orderid}</h1>
          <p>
            Name:{order?.placedBy[0]?.firstName} {order?.placedBy[0]?.lastName}
          </p>
          <p>
            Address : {order?.placedBy[0]?.address1} ,{" "}
            {order?.placedBy[0]?.city} , {order?.placedBy[0]?.zip} ,{" "}
            {order?.placedBy[0]?.state} - {order?.placedBy[0]?.country}
          </p>
          <p> Phone Number : {order?.placedBy[0]?.contactNumber}</p>
          <p>
            <Button
              className="opt"
              onClick={(event) =>
                generateOtp(event, order?.placedBy[0]?.contactNumber)
              }
            >
              Generate OTP
            </Button>
          </p>
          {verifyotpfield && (
            <>
              <input
                type="text"
                name="otp"
                value={otpInput}
                onChange={(event) => setOtpInput(event.target.value)}
              />
              <button
                onClick={(event) =>
                  verifyOtp(event, order?.placedBy[0]?.contactNumber)
                }
              >
                Verify Otp
              </button>
            </>
          )}
          {verifiedOtp && (
            <Button className="opt" onClick={deliveredHandleChange}>
              Delivered
            </Button>
          )}
        </div>
      ))}
    </div>
  );
}

export default Order;
