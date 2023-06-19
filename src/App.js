import React, { useState, useRef } from "react";
import "./App.css";
import { Auth } from "./components/Auth";
import { Chat } from "./components/Chat";
import Cookies from "universal-cookie";
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState("");

  const roomInputRef = useRef(null);

  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setRoom(null);
  };

  if (!isAuth) {
    return (
      <div>
        <Auth setIsAuth={setIsAuth} />
      </div>
    );
  }
  return (
    <div>
      {room ? (
        <Chat room={room} />
      ) : (
        <div className="room-select">
          <form>
            <div className="form-floating mb-3">
              <input
                ref={roomInputRef}
                className="form-control mb-3 fw-light"
                placeholder="Enter Room Name"
              />
              <label>Enter Room Name</label>
            </div>
            <div className="d-grid gap-2">
              <button
                onClick={() => setRoom(roomInputRef.current.value)}
                className="btn btn-primary "
              >
                Enter Room
              </button>
            </div>
          </form>
        </div>
      )}
      <div className="sign-out  p-2">
        <button className="btn btn-secondary" onClick={signUserOut}>
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default App;
