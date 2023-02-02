import logo from "./logo.svg";
import "./App.css";
import React from "react";
import axios from "axios";
function App() {
  React.useEffect(() => {
    const http = axios.create({
      baseURL: "http://localhost:8000",
      withCredentials: true,
    });
    const getToken = () => {
      return sessionStorage.getItem("access_token")
        ? sessionStorage.getItem("access_token")
        : null;
    };
    const getUser = async () => {
      await http.get("/sanctum/csrf-cookie").then((response) => {
        const login = async () => {
          const result = await http
            .post("/api/login", {
              email: "supper@gmail.com",
              password: "supper#123",
            })
            .then((response) => {
              return response.data;
            });
          if (result) {
            sessionStorage.setItem("access_token", result.access_token);
          }
          const callUser = await http
            .get("/api/user", {
              headers: {
                Authorization: `Bearer ${getToken()}`,
              },
            })
            .then((response) => {
              return response.data;
            });
          console.log("callUser = ", callUser);
        };
        login();
      });
    };
    getUser();
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
