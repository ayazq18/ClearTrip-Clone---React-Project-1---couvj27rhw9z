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
    if(name && email && password){
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
          localStorage.setItem('token', result.token)
          localStorage.setItem('name', result.data.user.name)
          setName('')
          setEmail('')
          setPassword('')
          setIsSignUp(!isSignUp)
        } else if (result.message === 'User already exists') {
          alert('User already exists');
        }
    } catch (error) {
      alert(error);
    }
  }else{
    alert("Enter correct details")
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
      if (result.status === 'success') {
        localStorage.setItem('token', JSON.stringify(result.token));
        localStorage.setItem('name', JSON.stringify(result.data.user.name))
        setToken(localStorage.getItem('token'))
        setShowSignUp(false)
        setShowSignUp(!showSignup);
      } else {
        alert('Please enter Correct Email or Password')
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
            <div className=" login-form-btn flexXY">
              <button>Signup</button>
            </div>
            <div className="flexXY"><p onClick={() => handleLoginSignUp()} style={{ color: 'blue', cursor:'pointer' }}>If you are an existing user please Log in</p></div>
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
              <div className=" login-form-btn flexXY">
                <button>Login</button>
              </div>
              <div className="flexXY"><p onClick={() => handleToSignUp()} style={{ color: 'blue', cursor:'pointer' }}>If you are not an existing user please SignUp</p></div>
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
