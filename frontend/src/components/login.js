import React, { useState } from "react";
// import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="Register">
      <p>Login </p>
      <input
        type="text"
        placeholder="email here"
        className="inputRegister"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      ></input>
      <br />
      <br />
      <input
        type="password"
        placeholder="password here"
        className="inputRegister"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      ></input>
      <br />
      <br />
      <button className="btnRegister">Login</button>
    </div>
  );
}
