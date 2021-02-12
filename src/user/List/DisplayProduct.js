import { Divider } from "@material-ui/core";
import React from "react";
import DisplayList from "./DisplayList";
import "./DisplayProduct.css";
function DisplayProduct() {
  return (
    <div className="display">
      {/* <div className="display__left"> This is a left container</div> */}
      <Divider orientation="vertical" flexItem />
      <div className="display__right">
        <DisplayList />
      </div>
    </div>
  );
}

export default DisplayProduct;
