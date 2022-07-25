import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import GoalForm from "../components/GoalForm";
import { getGoals } from "../features/goals/goalSlice";
import GoalItem from "../components/GoalItem";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goals
  );

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    dispatch(getGoals());
  }, [user, navigate, isError, message, dispatch]);

  return (
    <>
      <div className="dashboard">
        <h2>Welcome, {user && user.name}</h2>
        <p> Your Goals Dashboard </p>
      </div>
      <GoalForm />
      <section className="content">
        {goals.length > 0 ? (
          <div className="goals">
            {goals.map((item) => (
              <GoalItem key={item._id} goal={item} />
            ))}
          </div>
        ) : (
          <h3> You didn't set any goals </h3>
        )}
      </section>
    </>
  );
}

export default Dashboard;
