import { Divider } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import DisplayList from "./DisplayList";
import axios from "../../axios";
import Loading from "../../assets/images/Loading.gif";
import "./DisplayProduct.css";
function DisplayProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { category } = useParams();

  useEffect(() => {
    let unmounted = false;

    async function fetchData() {
      const req = await axios
        .get(`/${category}`)
        .then((res) => {
          if (!unmounted) {
            setProducts(res.data);
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
  let product_category = category;
  console.log(product_category);
  return (
    <div className="display">
      {/* <div className="display__left"> This is a left container</div>
      <Divider orientation="vertical" flexItem /> */}
      <div className="display__right">
        <DisplayList data={products} productcategory={product_category} />
      </div>
    </div>
  );
}

export default DisplayProduct;
