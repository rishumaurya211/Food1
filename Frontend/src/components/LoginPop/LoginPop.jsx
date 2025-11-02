import React, { useContext, useState } from "react";
import "./LoginPop.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPop = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);

  const [currState, setCurrState] = useState("Login");

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };
  const onLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    // toast.info("Processing...");

    let endpoint =
      currState === "Login" ? "/api/user/login" : "/api/user/register";

    try {
      const response = await axios.post(`${url}${endpoint}`, data);

      if (response.data.success) {
        toast.success(
          currState === "Login" ? "Login Successful!" : "Account Created!"
        );
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);

        // Close the login popup after a delay
        setTimeout(() => setShowLogin(false), 2000);

        // Clear input fields
        setData({ name: "", email: "", password: "" });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Error during login/register:", error);
    } finally {
      setLoading(false);
    }
  };

  // const onLogin = async (event) => {
  //   event.preventDefault();
  //   let newUrl = url;
  //   if (currState === "Login") {
  //     newUrl += "/api/user/login";
  //   } else {
  //     newUrl += "/api/user/register";
  //   }

  //   try {
  //     const response = await axios.post(newUrl, data);

  //     if (response.data.success) {
  //       setToken(response.data.token);
  //       localStorage.setItem("token", response.data.token);
  //       setShowLogin(false);

  //       // Clear sensitive data from state
  //       setData({
  //         name: "",
  //         email: "",
  //         password: "",
  //       });
  //     } else {
  //       alert(response.data.message);
  //     }
  //   } catch (error) {
  //     console.error("Error during login/register:", error);
  //     alert("An error occurred. Please try again.");
  //   }
  // };

  // const onLogin = async (event) => {
  //   event.preventDefalut();
  //   let newUrl = url;
  //   if (currState == "Login") {
  //     newUrl += "/api/user/login";
  //   } else {
  //     newUrl += "/api/user/register";
  //   }

  //   const response = await axios.post(newUrl, data);

  //   if (response.data.success) {
  //     setToken(response.data.token);
  //     localStorage.setItem("token", response.data.token);
  //     setShowLogin(false);
  //   } else {
  //     alert(response.data.message);
  //   }
  // };
  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-inputs">
          {currState === "Sign Up" && ( // Correct condition for Sign Up
            <input
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Your name"
              required
            />
          )}
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Your email"
            required
          />
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <button type="submit">
          {currState === "Sign Up" ? "Create account" : "Login"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy</p>
        </div>
        {currState === "Login" ? (
          <p>
            Create a new Account?{" "}
            <span onClick={() => setCurrState("Sign Up")}>Click Here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrState("Login")}>Login here</span>
          </p>
        )}
      </form>
      <div>
        <ToastContainer position="top-left" autoClose={3000} />
      </div>
    </div>
  );
};
// return (
//   <div className="login-popup">
//     <form onSubmit={onLogin} className="login-popup-container">
//       <div className="login-popup-title">
//         <h2>{currState}</h2>
//         <img
//           onClick={() => setShowLogin(false)}
//           src={assets.cross_icon}
//           alt=""
//         />
//       </div>
//       <div className="login-popup-inputs">
//         {currState === "Login" ? (
//           <></>
//         ) : (
//           <input
//             name="name"
//             onChange={onChangeHandler}
//             value={data.name}
//             type="text"
//             placeholder="Your name"
//             required
//           />
//         )}

//         <input
//           name="email"
//           onChange={onChangeHandler}
//           value={data.email}
//           type="email"
//           placeholder="Your email"
//           required
//         />
//         <input
//           name="password"
//           onChange={onChangeHandler}
//           value={data.password}
//           type="password"
//           placeholder="Password"
//           required
//         />
//       </div>
//       <button type="submit">
//         {currState === "Sign Up" ? "Create account" : "Login"}
//       </button>
//       <div className="login-popup-condition">
//         <input type="checkbox" required />
//         <p>By continuing , i agree to the terms of use & privacy policy</p>
//       </div>
//       {currState === "Login" ? (
//         <p>
//           Create a new Account ?{" "}
//           <span onClick={() => setCurrState("Sign UP")}>Click Here</span>
//         </p>
//       ) : (
//         <p>
//           Already have na account?{" "}
//           <span onClick={() => setCurrState("Login")}>Login here</span>
//         </p>
//       )}
//     </form>
//   </div>
// );
// };

export default LoginPop;
