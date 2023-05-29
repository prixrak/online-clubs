import { FC } from "react";
import { useStyles } from "./LoginPage.styles";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuth } from "reactfire";
import { Button } from "@mui/material";

interface Props {}

export const LoginPage: FC<Props> = () => {
  const styles = useStyles();
  const auth = useAuth();
  const signIn = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  return (
    <Button className={styles.root} onClick={signIn}>
      sign in google
    </Button>
  );
};
