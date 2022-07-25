import axios from "axios";

const API_URL = "/api/goals/";

// create goal
const createGoal = async (goalData, token) => {
  const config = {
    headers: {
      token: `Bearer ${token}`,
    },
  };

  console.log(config);

  const response = await axios.post(API_URL + "create", goalData, config);

  return response.data;
};

// get goals

const getGoals = async (token) => {
  const config = {
    headers: {
      token: `Bearer ${token}`,
    },
  };

  console.log(config);

  const response = await axios.get(API_URL, config);

  return response.data;
};

// delete goal
const deleteGoal = async (id, token) => {
  const config = {
    headers: {
      token: `Bearer ${token}`,
    },
  };

  console.log(config);

  const response = await axios.delete(API_URL + id, config);

  return response.data;
};

const goalService = {
  createGoal,
  getGoals,
  deleteGoal,
};

export default goalService;
