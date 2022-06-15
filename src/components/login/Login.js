import axios from "axios";
import React, { useState } from "react";

export const Login = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({});

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/users/1"
      );
      console.log(data);
      
      setUser(data);
      
    } catch (e) {
      setError(true);
    }
    setLoading(false);
  };

  return (
    <div>
      {user ? (<span>{user.name}</span>) : null}
      <form>
        <input
          data-testid="username"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          disabled={!username || !password ? true : false}
          type="submit"
          onClick={handleClick}
        >
          {loading ? "Please wait.." : "Login"}
        </button>
        <span
          data-testid="error"
          style={{ visibility: error ? "visible" : "hidden" }}
        >
          Something went wrong
        </span>
      </form>
    </div>
  );
};
