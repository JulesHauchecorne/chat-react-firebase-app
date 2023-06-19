import { auth, provider } from "../firebase-config.js";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export const Auth = (props) => {
  const { setIsAuth } = props;
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="login">
      <div className="auth">
        <button className="btn btn-lg btn-secondary p-3 align-middle  my-5" onClick={signInWithGoogle}>
          Sign In With Google To Continue
        </button>
      </div>
    </div>
  );
};
