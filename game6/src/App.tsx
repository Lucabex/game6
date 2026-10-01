import React, { useState } from "react";
const Api_url = "http://localhost:5033/auth";
function App() {
  const [inputName, setInputName] = useState<string>("");
  const [inputUserName, setInputUserName] = useState<string>("");
  const [inputPassword, setInputPassword] = useState<string>("");
  const [logged, setLogged] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleRegister = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch(`${Api_url}/reg`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          userName: inputUserName,
          name: inputName,
          password: inputPassword,
        }),
      });
      if (!response.ok) {
        let errorMessage = "";
        if (response.status == 400) {
          errorMessage = "Error 400";
        } else if (response.status == 401) {
          errorMessage = "error 401";
        } else {
          errorMessage = `Service error : ${response.status}  ${response.statusText}`;
        }
        setError(errorMessage);
        return;
      }
      const data = await response.json();
      console.log(`User ${data.name} registered`);
      console.log(data);
    } catch (error) {
      console.error(error);
      return;
    }
  };

  const handleLogIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch(`${Api_url}/log`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: inputUserName,
          password: inputPassword,
        }),
      });
      if (!response.ok) {
        let errorMessage = "";
        if (response.status == 400) {
          errorMessage = "Error 400";
        } else if (response.status == 401) {
          errorMessage = "error 401";
        } else {
          errorMessage = `Service error : ${response.status}  ${response.statusText}`;
        }
        setError(errorMessage);
        return;
      }
      const data = await response.json();
      console.log(data);
      console.log("this is token", data.token);
      if (data.name && data.token && data.id) {
        localStorage.setItem("id", data.name);
        localStorage.setItem("token", data.token);
        localStorage.setItem("name", data.name);
        setLogged(true);
        console.log("all data added to local storege");
      }
    } catch (error) {
      console.error(error);
      return;
    }
  };
  return (
    <>
      {!logged && (
        <div className="boxContainer">
          <div className="inputBox">
            <h2>Log-in or register</h2>
            <input
              type="text"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              placeholder="Name..."
            />
            <input
              type="text"
              value={inputUserName}
              onChange={(e) => setInputUserName(e.target.value)}
              placeholder="User Name..."
            />
            <input
              type="password"
              value={inputPassword}
              onChange={(e) => setInputPassword(e.target.value)}
              placeholder="Password..."
            />
            <div className="buttonBox">
              <button onClick={handleLogIn}>Log-In</button>
              <button onClick={handleRegister}>Register</button>
            </div>
          </div>
        </div>
      )}
      {logged && <>hola</>}
    </>
  );
}
export default App;
