import { useState } from "react";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const handleEmail = (e) => {
    setForm((prev) => ({ ...prev, email: e.target.value }));
  };
  const handlePassword = (e) => {
    setForm((prev) => ({
      ...prev,
      password: e.target.value,
    }));
  };
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, form, {
        headers: {
          "Content-Type": "application/json",
        },
        // ✅ REQUIRED if you are using cookies
        withCredentials: true,
      });

      console.log(res);
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <Navbar />
      <main className="container">
        <h1>Log in to your account.</h1>
        <div>
          {/* login */}
          <form onSubmit={submitForm}>
            {/* email */}
            <label className="form-label" htmlFor="">
              Email
            </label>
            <br />
            <input
              type="text"
              className="form-control"
              placeholder="Enter your email"
              value={form.email}
              required
              onChange={handleEmail}
            />
            <br />

            {/* password */}
            <label className="form-label" htmlFor="">
              Password
            </label>
            <br />
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              required
              onChange={handlePassword}
            />
            <br />
            <button
              type="submit"
              value={form.password}
              className="btn btn-primary"
            >
              Login
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
};
