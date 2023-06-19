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
        <div className="room p-5">
          <form>
            <label class="form-label fw-bold">Enter Room Name:</label>
            <input ref={roomInputRef} class="form-control mb-3" />
            <div class="d-grid gap-2">
              <button
                onClick={() => setRoom(roomInputRef.current.value)}
                className="btn btn-primary "
              >
                Enter Chat
              </button>
            </div>
          </form>
        </div>
      )}
      <div className="sign-out">
        <button onClick={signUserOut}>Sign Out</button>
      </div>
    </div>
  );
}

export default App;
