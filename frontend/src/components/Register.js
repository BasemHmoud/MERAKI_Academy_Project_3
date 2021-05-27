import React, { useState } from "react";
import axios from "axios";

export default function Register() {
  const [firstName, setfName] = useState("");
  const [lastName, setlName] = useState("");
  const [age, setAge] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Users, setUsers] = useState("");
  const [massage, setMassage] = useState("");

  const submitUsers = () => {
    console.log(firstName,lastName,age,country,email,password);
    axios
      .post("http://localhost:5000/users", {
        firstName,
        lastName,
        age,
        country,
        email,
        password
      })
      .then((result) => {
        console.log(result.data);
        // setUsers(result.data);
        if(result.data._id){
          setMassage("The user has been created successfully")
          // console.log("The user has been created successfully");
        
        }
        else{
          setMassage("Error happened while register, please try again")

            // console.log(" Error happened while register, please try again");
          
        }
        //res.json("The user has been created successfully");
      });
    // .catch((err) => {
    //   //res.json(" Error happened while register, please try again");
    // });
  };
  return (
    <div className="Register">
      <p>Register : </p>
      <input
        type="text"
        placeholder="First Name here "
        className="inputRegister"
        onChange={(e) => {
          setfName(e.target.value);
        }}
      ></input>
      <br />
      <br />
      <input
        type="text"
        placeholder="Last Name here"
        className="inputRegister"
        onChange={(e) => {
          setlName(e.target.value);
        }}
      ></input>
      <br />
      <br />
      <input
        type="number"
        placeholder="age here"
        className="inputRegister"
        onChange={(e) => {
          setAge(e.target.value);
        }}
      ></input>
      <br />
      <br />
      <input
        type="text"
        placeholder="country here"
        className="inputRegister"
        onChange={(e) => {
          setCountry(e.target.value);
        }}
      ></input>
      <br />
      <br />
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
      <button className="btnRegister"   onClick={submitUsers}>
        Register
      </button>
      <p>{massage}</p>
    </div>
  );
}
