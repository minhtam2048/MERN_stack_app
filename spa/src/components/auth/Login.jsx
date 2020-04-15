import React, { Fragment, useState } from "react";
import { Link } from 'react-router-dom';
// import axios from "axios";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;

  const handleFormChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFormSubmit = async e => {
    e.preventDefault();

    //   const newUser = {
    //     name,
    //     email,
    //     password
    //   };
    //   try {
    //     const config = {
    //       headers: {
    //         "Content-Type": "application/json"
    //       }
    //     };

    //     const body = JSON.stringify(newUser);
    //     const res = await axios.post("/api/users", body, config);
    //   } catch (err) {
    //     console.error(err.response.data);
    //   }
    console.log("SUCCESS");
  };
  return (
    <Fragment>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fa fa-user"></i> Sign Into your account
      </p>
      <form className="form" onSubmit={e => handleFormSubmit(e)}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={e => handleFormChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={e => handleFormChange(e)}
            minLength="6"
            required
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </Fragment>
  );
};

export default Login;
