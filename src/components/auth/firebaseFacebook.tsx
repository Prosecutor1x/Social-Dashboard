import { auth, FacebookAuthProvider } from "../../utils/firebase.config"; // Import the Firebase setup

export const FaceBookSignInComponent = () => {
  const handleFacebookLogin = async () => {
    const provider = new FacebookAuthProvider();

    try {
      const result = await (auth as any).signInWithPopup(provider);
      const user = result.user;
      console.log(user);
      console.log(result); // User details after successful login
    } catch (error) {
      console.error("Error signing in with Facebook:", error);
    }
  };
  return (
    <>
      <button onClick={handleFacebookLogin} className="btn-primary">
        Facebook Login
      </button>
    </>
  );
};
