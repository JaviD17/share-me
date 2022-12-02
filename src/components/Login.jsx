import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import shareVideo from "../assets/share.mp4";
import logo from "../assets/logowhite.png";

import { client } from "../client";

const Login = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  // const handleSignout = (e) => {
  //   setUser({});
  //   console.log(e);
  //   document.getElementById("signInDiv").hidden = false;
  // };

  const handleCallbackResponse = (response) => {
    // console.log(response);
    let userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);
    localStorage.setItem("user", JSON.stringify(userObject));
 
    document.getElementById("signInDiv").hidden = true;

    const doc = {
      _id: userObject.sub,
      _type: "user",
      userName: userObject.name,
      image: userObject.picture,
    };

    client.createIfNotExists(doc).then(() => {
      navigate("/", { replace: true });
    });
  };

  // runs once with empty erray
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_API_TOKEN,
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });

    google.accounts.id.prompt();
  }, []);

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute flex flex-col justify-center items-center top-0 right-0 bottom-0 left-0 bg-blackOverlay">
        <div className="p-5">
          <img src={logo} width="130px" alt="logo" />
        </div>
        <div className="shadow-2xl" id="signInDiv"></div>
        {/* {Object.keys(user).length !== 0 && (
          <button className="text-white" onClick={(e) => handleSignout(e)}>
            Sign Out
          </button>
        )} */}
        {user && (
          <div>
            <h3>{user.name}</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
