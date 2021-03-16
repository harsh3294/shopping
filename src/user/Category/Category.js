import React, { useEffect, useState } from "react";
import "./Category.css";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import axios from "../../axios";
import { useHistory } from "react-router";
function Category() {
  const history = useHistory();
  const [categorys, setCategorys] = useState([
    {
      name: "Mobiles",
      product: "mobile",
    },
    {
      name: "Accessories",
      product: "accessories",
    },
    {
      name: "Clothing",
      product: "clothing",
    },
  ]);
  const product = (category) => {
    console.log(category);
    history.push(`/category/${category}`);
  };
  return (
    <div className="categorys">
      {categorys.map((category) => (
        <button
          className="categoryName"
          onClick={() => product(category.product)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}

export default Category;
