import React, { useEffect, useState } from "react";
import "./Category.css";

import axios from "../../axios";
import { useHistory } from "react-router";
import { Button } from "@material-ui/core";
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
      name: "Mens Wear",
      product: "menswear",
    },
  ]);
  const product = (category) => {
    console.log(category);
    history.push(`/category/${category}`);
  };
  return (
    <div className="categorys">
      {categorys.map((category) => (
        <Button
          className="categoryName"
          // startIcon={<AddIcon fontSize="large" />}
          onClick={() => product(category.product)}
        >
          {category.name}
        </Button>
        // <button
        //   className="categoryName"
        //   onClick={() => product(category.product)}
        // >
        //   {category.name}
        // </button>
      ))}
    </div>
  );
}

export default Category;
