import React from "react";
import { Link, useHistory } from "react-router-dom";
import "./SignIn.css";
import api from "../../utils/api";

export default function SignUp() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [fullName, setFullName] = React.useState("");

  const history = useHistory();

  const handleRegisterClick = async () => {
    try {
      await api.axios.post(`${api.apiUrl}/users/register`, {
        email,
        password,
        fullName,
      });

      // redirection
      history.push("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="Container">
      <div className="Row">
        <h3>Sign Up</h3>
      </div>
      <div className="Row">
        <input
          value={email}
          className="Input"
          type="text"
          placeholder="Email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="Row">
        <input
          value={password}
          className="Input"
          type="password"
          placeholder="Password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="Row">
        <input
          value={confirmPassword}
          className="Input"
          type="password"
          placeholder="Confirm password"
          name="password-confirm"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <div className="Row">
        <input
          value={fullName}
          className="Input"
          type="text"
          placeholder="Full name"
          name="fullName"
          onChange={(e) => setFullName(e.target.value)}
        />
      </div>
      <div className="Row Row-Btn">
        <Link className="Redirect" to="/login">
          Login
        </Link>
        <button className="Validate" onClick={handleRegisterClick}>
          REGISTER
        </button>
      </div>
    </div>
  );
}
