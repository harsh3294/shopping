import React, { useEffect, useState } from "react";
import "./Category.css";

import axios from "../../axios";
import { useHistory } from "react-router";
function Category() {
  const history = useHistory();
  const [categorys, setCategorys] = useState([
    {
      name: "Mobiles",
      product: "mobiles",
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
