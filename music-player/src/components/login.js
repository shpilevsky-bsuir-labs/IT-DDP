import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./login.css";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (user) {
  //     navigate("/");
  //   }
  // }, [user]);
  return (
    <div>
      <div id="main">
        <h2>Login to your account</h2>

        <div class="input-parent">
          <label for="username">Username or Email</label>
          <input
            type="text"
            id="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>

        <div class="input-parent">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          id="login"
          type="submit"
          // onClick={logInWithEmailAndPassword(email, password)}
        >
          Login
        </button>
      </div>
      {/* <script src="./scripts/loginButtonClick.js"></script> */}
    </div>
  );
}

export default Login;
