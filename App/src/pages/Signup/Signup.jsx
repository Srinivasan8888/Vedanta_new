import React, { useState, useEffect } from "react";
import loginbg from "../../Assets/images/loginbg.png";
import xyma from "../../Assets/images/Xyma-Logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setconfirmPassword] = useState("");
  const [role, setRole] = useState("user");
  const [errorMessage, setErrorMessage] = useState("");
  const [passkey, setPasskey] = useState("");
  const navigate = useNavigate();

  console.log("role", role);
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const token2 = localStorage.getItem("refreshToken");

    if (token && token2) {
      navigate("/Dashboard");
    }
  }, [navigate]);


  const registerUser = async (event) => {
    event.preventDefault();
    if (confirmpassword === password) {
      if (passkey !== process.env.REACT_APP_SIGNUP_SECRET_KEY) {
        setErrorMessage("Invalid passkey");
        return;
      }
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_SERVER_URL}auth/register`,
          {
            email,
            password,
            role,
          },
        );

        if (response.data.email) {
          alert("user created successfully");
          window.location.href = `${process.env.REACT_APP_URL}`;
        } else {
          alert("Unknown error has occurred");
        }
      } catch (error) {
        setErrorMessage(
          `Failed to register: ${error.response?.data?.error?.message || error.message}`,
        );
      }
    } else {
      alert("Password is not matching");
    }
  };

  return (
    <div className="h-screen">
      <section
        className="relative flex items-center justify-center w-full h-full bg-fixed bg-center bg-cover"
        style={{ backgroundImage: `url(${loginbg})` }}
      >
        <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>
        <div className="relative z-10 flex flex-col items-center justify-center w-full px-6">
          <a className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img className="w-32 h-auto mr-2" src={xyma} alt="logo" />
          </a>
          <div className="w-full bg-white rounded-lg shadow sm:max-w-md xl:p-0 dark:border dark:border-gray-700 dark:bg-gray-800">
            <div className="p-6 space-y-4 sm:p-8 md:space-y-6">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create a new account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={registerUser}>
                <div>
                  <label
                    for="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    placeholder="name@company.com"
                    required="true"
                  />
                </div>
                <div>
                  <label
                    for="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    required="true"
                  />
                </div>
                <div>
                  <label
                    for="confirm-password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirm-password"
                    onChange={(e) => setconfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    required=""
                  />
                </div>
                <div>
                  <label
                    for="confirm-password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    User Role
                  </label>

                  <select 
                    required 
                    value={role}
                    onChange={(e) => {
                      setRole(e.target.value);
                    }} 
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="superadmin">Super-Admin</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="passkey"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Enter Pass Key
                  </label>
                  <input
                    type="password"
                    name="passkey"
                    onChange={(e) => setPasskey(e.target.value)}
                    placeholder="Enter secret passkey"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="text-red-700 error-message">{errorMessage}</div>
                <div></div>
                <button
                  onClick={() => setErrorMessage("")}
                  type="submit"
                  className="w-full rounded-lg bg-primary-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign up
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account yet?{" "}
                  <a
                    href="/"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign in
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Signup;
