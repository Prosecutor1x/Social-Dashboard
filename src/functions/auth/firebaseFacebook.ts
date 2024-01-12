import { auth, FacebookAuthProvider } from "../../utils/firebase.config"; // Import the Firebase setup

export const YourComponent = () => {
  const handleFacebookLogin = async () => {
    const provider = new FacebookAuthProvider();

    try {
      const result = await auth.signInWithPopup(provider);
      const user = result.user;
      console.log(user); // User details after successful login
    } catch (error) {
      console.error("Error signing in with Facebook:", error);
    }
  };
};
