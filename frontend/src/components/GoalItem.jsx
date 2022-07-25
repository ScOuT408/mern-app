import React from "react";
import { useDispatch } from "react-redux";
import { deleteGoal } from "../features/goals/goalSlice";

function GoalItem({ goal }) {
  const dispatch = useDispatch();

  return (
    <div className="goal">
      <h2> {goal.text} </h2>
      <button onClick={() => dispatch(deleteGoal(goal._id))}> x </button>
    </div>
  );
}

export default GoalItem;
