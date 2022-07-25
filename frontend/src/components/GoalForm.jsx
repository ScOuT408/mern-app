import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { createGoal } from "../features/goals/goalSlice";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -6rem;
`;
const Form = styled.form`
  width: 60rem;
  padding: 2rem;
  text-align: center;
  position: relative;
  margin: 1rem auto;
`;
const Input = styled.input`
  width: 100%;
  height: 5rem;
  margin: 0.8rem 0;
  padding: 1rem 1.2rem;
  font-size: 1.6rem;
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

function GoalForm() {
  const [goal, setGoal] = useState("");

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(createGoal({ text: goal }));
    setGoal("");
  };

  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <Input
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          type="text"
          placeholder="Enter Your goal"
        />
        <Button> Add Goal </Button>
      </Form>
    </Container>
  );
}

export default GoalForm;
