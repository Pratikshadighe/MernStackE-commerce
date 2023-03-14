import React from "react";
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./Footer.css";
export const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>Download Our App </h4>
        <p>Download App for android 7 IOS mobile app</p>
        <img src={playStore} alt="playstore"></img>
        <img src={appStore} alt="appstore"></img>
      </div>
      <div className="midFooter">
        <h1>ECOMMERCE.</h1>
        <p>High Quality is our first priority</p>
        <p>Copyrights 2021 &copy; </p>
      </div>
      <div className="rightFooter">
        <h4>Follow us</h4>
        <a href="http://instagram.com">Instagram</a>
        <a href="http://youtube.com">YouTube</a>
        <a href="http://facebook.com">Facebook</a>
      </div>
    </footer>
  );
};
