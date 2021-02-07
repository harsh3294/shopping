import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import "./Footer.css";
import { Divider } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    color: "#05386b",
    fontWeight: "bold",
    fontFamily: "Dancing Script, cursive",
    letterSpacing: "0.130rem",
  },
}));

function Footer() {
  const classes = useStyles();
  return (
    <div className="footer">
      <div className="footer__row1">
        <div className="footer__shop">
          <div className="footer__shopTitle">Shop</div>
          <div className="footer__shopBody">
            <div className="footer__shopBody__Title">By Category</div>
          </div>
        </div>
        <div className="footer__support">
          <div className="footer__supportTitle">Support</div>
          <div className="footer__supportBody">Order Status</div>
        </div>
        <div className="footer__contact">
          <div className="footer__contactTitle">Contact</div>
          <div className="footer__contactBody">
            <div className="footer__contactEmail">
              Email
              <div className="footer__email">harshc3294@gmail.com</div>
            </div>
            <div className="footer__contactTelephone">
              Contact Us
              <div className="footer__telephone">+91 9326203404</div>
            </div>
            <div className="footer__contactAddress">
              Address
              <div className="footer__address">
                1588,South Coast,Mumbai,India
              </div>
            </div>
            <div className="footer__contactHours">
              Hours
              <div className="footer__hours">Mon-Sat 9:00 am - 9:00 pm</div>
            </div>
          </div>
        </div>
      </div>
      <Divider light />
      <div className="footer__row2">
        <div className="footer__shopper">
          <Typography variant="h6" className={classes.title}>
            Shoppers
          </Typography>
          <div className="footer__shopperBody"> &copy; Harsh 2021</div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
