import React, { useState } from "react";
import { Base_URL, Project_ID, App_Type } from "../Constants.js";
import { RxCross1 } from "react-icons/rx";

import "./Signup.css";
import LoginCorousel from "../Corousel/LoginPage/LoginCorousel.js";
export default function Signup({ token, setToken, showSignup, setShowSignUp }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(true)

  const closeLoginCard = () => {
    setShowSignUp(!showSignup);
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const user = {
        name,
        email,
        password,
        appType: App_Type,
      };
      const response = await fetch(`${Base_URL}/signup`, {
        method: "POST",
        headers: {
          projectID: Project_ID,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...user }),
      });
      const result = await response.json()
      if (result.status === 'success') {
        localStorage.setItem('token', JSON.stringify(result.token))
        localStorage.setItem('name', JSON.stringify(result.data.name))
        setIsSignUp(false)
        setShowSignUp(false)
      } else {
        alert('error');
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const loginInfo = {
        email,
        password,
        appType: App_Type,
      }
      const response = await fetch(`${Base_URL}/login`, {
        method: 'POST',
        headers: {
          projectID: Project_ID,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...loginInfo })
      });
      const result = await response.json()
      console.log(result);
      if (result.status === 'success') {
        localStorage.setItem('token', JSON.stringify(result.token));
        localStorage.setItem('name', JSON.stringify(result.data.name))
        setShowSignUp(false)
        setToken(localStorage.getItem('token'))
      } else {
        alert('error')
      }
    } catch (error) {
      console.log(error)
    }

  }

  const handleLoginSignUp = () => {
    setIsSignUp(!isSignUp)
  }

  const handleToSignUp = () => {
    setIsSignUp(!isSignUp)
  }

  return (
    <>
      <div className="login-page flexXY">
        <div className="corousel flexXY">
          <LoginCorousel />
        </div>
        <div className="login-section">
          <div>
            <RxCross1
              className="close-icon"
              onClick={() => closeLoginCard()}
            />
          </div>
          {!isSignUp ? (<form
            className="login-form flexXY"
            onSubmit={(e) => handleSubmit(e)}
          >
            <input
              type="text"
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className=" login-form-btn flexBet">
              <button>Signup</button>
              <h1 onClick={() => handleLoginSignUp()}>Login</h1>
            </div>
          </form>) :
            (<form
              className="login-form flexXY"
              onSubmit={(e) => handleLogin(e)}
            >
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className=" login-form-btn flexBet">
                <button>Login</button>
                <h1 onClick={() => handleToSignUp()}>Signup</h1>
              </div>
            </form>
            )}
          <div className="footer-section flexc">
            <p>
              We now support mobile number based login. The option will be available soon.
            </p>
            <p className="footer">
              By continuing, you agree to Cleartrip's{" "}
              <a href="#">privacy policy</a> & <a href="#">terms of use.</a>
            </p>
          </div>
        </div>
        <div className="transparent"></div>
      </div>
    </>
  );
}
