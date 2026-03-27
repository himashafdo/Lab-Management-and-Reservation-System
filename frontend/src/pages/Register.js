import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const register = async () => {
    if (!name || !email || !password) {
      alert("Fill all fields");
      return;
    }

    try {
      await axios.post("http://localhost:3000/api/auth/register", {
        name,
        email,
        password,
      });

      alert("Registered successfully!");
      navigate("/");
    } catch (err) {
      alert("Error registering");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Create Account</h2>

        <input
          placeholder="Full Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={register}>REGISTER</button>

        <p>
          Already have an account?{" "}
          <span onClick={() => navigate("/")}>Login</span>
        </p>
      </div>
    </div>
  );
}

export default Register;