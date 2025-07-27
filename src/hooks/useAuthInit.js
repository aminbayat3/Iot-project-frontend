import { useEffect } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import useAuthStore from "../store/authStore";

const useAuthInit = () => {
  const setToken = useAuthStore((state) => state.setToken);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        setToken(token); // sets token and saves to localStorage
      } else {
        setToken(null); // clears state and storage
      }
    });

    return () => unsubscribe(); // cleanup listener on unmount
  }, [setToken]);
};

export default useAuthInit;
