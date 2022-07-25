import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register, reset } from "../features/auth/authSlice";

const Container = styled.div`
  min-height: 75vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Heading = styled.h2`
  font-size: 2.7rem;
  color: #555;
  letter-spacing: 0.1rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;

  .icon {
    margin-right: 1rem;
  }
`;
const Text = styled.p`
  font-size: 1.9rem;
  font-weight: 550;
  text-transform: capitalize;
  text-align: center;
  color: #555;
`;
const Form = styled.form`
  max-width: 55rem;
  padding: 0.5rem 2rem;
  position: relative;
  text-align: center;
  margin-bottom: 2rem;
  margin: 1rem auto;
`;
const Input = styled.input`
  width: 100%;
  height: 5rem;
  margin: 0.8rem 0;
  padding: 1rem 1.2rem;
  font-size: 1.9rem;
  font-weight: 600;
  outline: none;
`;

const Button = styled.button`
  background: #444;
  color: #fff;
  font-size: 2rem;
  font-weight: 550;
  text-transform: capitalize;
  width: 100%;
  height: 5rem;
  display: inline-block;
  margin: 1rem 0;
  outline: none;
  border: 0.2rem solid #444;
  cursor: pointer;
  letter-spacing: 0.1rem;
`;

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const { name, email, password, cpassword } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      alert(message);
    }

    if (isSuccess || user) {
      navigate("/login");
    }

    dispatch(reset());
  }, [user, isSuccess, isError, message, navigate, dispatch]);

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== cpassword) {
      alert("Passwords do not match");
    } else {
      const userData = {
        name,
        email,
        password,
      };

      dispatch(register(userData));
    }
  };

  return (
    <Container>
      <Heading>
        <FaUser className="icon" /> Register Now
      </Heading>
      <Text> please create an account </Text>
      <Form onSubmit={onSubmit}>
        <Input
          name="name"
          value={name}
          type="text"
          placeholder="Enter name"
          onChange={handleChange}
        />
        <Input
          name="email"
          value={email}
          type="email"
          placeholder="Enter email"
          onChange={handleChange}
        />
        <Input
          name="password"
          value={password}
          type="password"
          placeholder="Enter password"
          onChange={handleChange}
        />
        <Input
          name="cpassword"
          value={cpassword}
          type="password"
          placeholder="Confirm password"
          onChange={handleChange}
        />
        <Button> register </Button>
      </Form>
    </Container>
  );
}

export default Register;
