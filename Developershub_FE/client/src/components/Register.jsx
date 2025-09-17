import React, { useState } from "react";
import axios from "axios";
import "./Register.css";
import {useNavigate} from "react-router-dom";

const Register = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    mobile: "",
    skill: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/register", formData);
      setMessage("Registration successful!");
       if (res.status === 200) {
        setFormData({});
        alert("Registration successful!");
        navigate("/login");
      }
      // console.log("Registered:", res.data);
    } catch (err) {
      console.error("Error during registration:", err.response?.data || err.message);
      setMessage(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="register-container">
      <h2><i className="fas fa-user"></i> Create Your Account</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <input type="text" name="fullname" placeholder="Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email Address" onChange={handleChange} required />
        <input type="text" name="mobile" placeholder="Mobile" onChange={handleChange} required />
        <input type="text" name="skill" placeholder="Skill (comma separated)" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
      {message && <p style={{ textAlign: "center", color: "red" }}>{message}</p>}
      <p className="signin-link">Already have an account? <a href="/login">Sign In</a></p>
    </div>
  );
};

export default Register;
