import React, { useState, useEffect } from "react";

import { Button } from "@material-ui/core";
import { useParams } from "react-router";
import { firebase } from "../../firebase";
import Loading from "../../images/Loading.gif";
import axios from "../../axios";

function Order() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [requestId, setRequestId] = useState({});
  const { orderid } = useParams();
  const [otpInput, setOtpInput] = useState("");
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
  const generateotp = (event, contactNumber) => {
    var myHeaders = new Headers();
    myHeaders.append("x-as-apikey", "d29abca7-3700-4b6b-af9b-78a0acd190a0");
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      messageFormat:
        "Hello, this is your OTP ${otp}. Please do not share it with anyone",
      phoneNumber: `+91${contactNumber}`,
      otpLength: 6,
      otpValidityInSeconds: 120,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://otp.apistack.run/v1/sendOtp", requestOptions)
      .then((response) => response.text())
      .then((result) => setRequestId(result))
      .catch((error) => console.log("error", error));
  };
  console.log(JSON.stringify(requestId.data));

  const verifyOtp = (event) => {
    event.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("x-as-apikey", "d29abca7-3700-4b6b-af9b-78a0acd190a0");
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      requestId: requestId,
      otp: otpInput,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://otp.apistack.run/v1/verifyOtp", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };
  if (loading) {
    return <img src={Loading} alt="loading" className="loading" />;
  }
  return (
    <div>
      {orders.map((order) => (
        <>
          <h1>{order.orderid}</h1>
          <p>
            {" "}
            {order?.placedBy[0]?.address1} , {order?.placedBy[0]?.city} ,{" "}
            {order?.placedBy[0]?.zip} , {order?.placedBy[0]?.state} -{" "}
            {order?.placedBy[0]?.country}
          </p>
          <p>{order?.placedBy[0]?.contactNumber}</p>
          <p>
            <Button
              onClick={(event) =>
                generateotp(event, order?.placedBy[0]?.contactNumber)
              }
            >
              Delivered
            </Button>
          </p>
          <input
            type="text"
            name="otp"
            value={otpInput}
            onChange={(event) => setOtpInput(event.target.value)}
          />
          <button onClick={verifyOtp}>Verify Otp</button>
        </>
      ))}
    </div>
  );
}

export default Order;
