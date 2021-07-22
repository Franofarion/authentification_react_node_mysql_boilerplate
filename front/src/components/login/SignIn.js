import React from "react";
import { Link, useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import api from "../../utils/api";

import "./SignIn.css";

export default function SignIn() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const history = useHistory();

  const handleLoginClick = async () => {
    try {
      const result = await api.axios.post(`${api.apiUrl}/users/login`, {
        email,
        password,
      });
      Cookies.set("token", result.data.token);

      // redirection
      history.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="Container">
      <div className="Row">
        <h3>Sign In</h3>
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
      <div className="Row Row-Btn">
        <Link className="Redirect" to="/register">
          Register
        </Link>
        <button className="Validate" onClick={handleLoginClick}>
          LOGIN
        </button>
      </div>
    </div>
  );
}
