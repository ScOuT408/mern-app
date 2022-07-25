import axios from "axios";

const API_URL = "api/users/";

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);
  console.log(response);

  // if (response.data) {
  //   localStorage.setItem("user", JSON.stringify(response.data));
  // }
  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post("api/users/login", userData);
  console.log(response);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// Logout User

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  login,
  register,
  logout,
};

export default authService;
