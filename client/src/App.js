import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

function App() {
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [passwordList, setPasswordList] = useState([]);

  // this fetch data every time we render page
  useEffect(() => {
    Axios.get("http://localhost:4000/showpasswords").then((response) => {
      setPasswordList(response.data);
    });
  }, [password, title]);

  // this make post request to server to add data
  const addPassword = () => {
    Axios.post("http://localhost:4000/addpassword", {
      password: password,
      title: title,
    }).then((response) => {
      setPassword("");
      setTitle("");
    });
  };

  const decryptPassword = (encryption) => {
    Axios.post("http://localhost:4000/decryptpassword", {
      password: encryption.password,
      iv: encryption.iv,
    }).then((response) => {
      setPasswordList(
        passwordList.map((val) => {
          return val.id === encryption.id
            ? {
                id: val.id,
                password: val.password,
                title: response.data,
                iv: val.iv,
              }
            : val;
        })
      );
    });
  };

  const handleDelete = (encryption) => {
    Axios.post("http://localhost:4000/deletepassword", {
      id: encryption.id,
    }).then((response) => {
      setPasswordList(response.data);
    });
  };

  return (
    <div className="App">
      <div className="heading">
        <p className="headingText">Add your passwords </p>
      </div>
      <div className="AddingPassword">
        <input
          type="text"
          placeholder="Ex. password123"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          value={password}
        />
        <input
          type="text"
          placeholder="Ex. Facebook"
          onChange={(event) => {
            setTitle(event.target.value);
          }}
          value={title}
        />
        <button onClick={addPassword}> Add Password</button>
      </div>

      <div className="Password">
        {passwordList.map((val, key) => {
          return (
            <div
              className="password"
              onClick={() => {
                decryptPassword({
                  password: val.password,
                  iv: val.iv,
                  id: val.id,
                });
              }}
              key={key}
            >
              <div className="joint">
                <h3>{val.title}</h3>

                <DeleteOutlineIcon
                  className="deleteIcon"
                  onClick={() => {
                    handleDelete({
                      id: val.id,
                    });
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
