import React from "react";

import { useHistory } from "react-router-dom";

import useFormHook from "@hooks/useFormHook";

import axios from "@axios";

import { Link } from "react-router-dom";

import { connect } from "react-redux";

import { login } from "@actions/userActions";

import { Form, Header, Input, Button, Message } from "@styles/common";

function Login({ user, login }) {
  let history = useHistory();

  const { inputs, onChange } = useFormHook({
    email: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/auth/login", inputs);
      if (response.data.success) {
        window.localStorage.setItem("user", JSON.stringify(response.data.user));
        login(response.data.user);
        history.push("/");
      } else {
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (user) {
    return <div>You are already logged in!</div>;
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Header>Login</Header>
      <Input
        type="email"
        placeholder="Email"
        name="email"
        value={inputs.email}
        onChange={onChange}
      />
      <Input
        type="password"
        placeholder="Password"
        name="password"
        value={inputs.password}
        onChange={onChange}
      />
      <Message>
        <Link to="/register">
          Don't have an account? Click here to Register!
        </Link>
      </Message>
      <Button>Login</Button>
    </Form>
  );
}

const mapStateToProps = (state) => {
  return { user: state.user };
};

export default connect(mapStateToProps, { login })(Login);
