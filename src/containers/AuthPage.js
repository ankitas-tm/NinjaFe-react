
import React from "react";
import Logo from '../images/turtlemint_ninja-logo.svg';
import Tabs from '../component/Tabs';
  
const AuthPage = () => {

  const menuItems = [
    {
      name: "Partner Lead Management",
      url: "/"
    },
    {
      name: "Partner Management",
      url: "/partner"
    },
    {
      name: "Quote Request",
      url: "/"
    },
    {
      name: "Policy Issuance",
      url: "/"
    },
    {
      name: "MIS",
      url: "/"
    },
    {
      name: "Renewals",
      url: "/"
    }
  ]

  return (
    <div className="container">
      <div className="auth-page">
        <div className="image-wrapper">
          <img
            alt="turtlemint"
            width={"155px"}
            src={Logo}
          />
          <h3 className="heading">Welcome Ankita Sangodkar</h3>
        </div>
        <Tabs menuItems={menuItems} />
      </div>
    </div>
  );
};
  
export default AuthPage;