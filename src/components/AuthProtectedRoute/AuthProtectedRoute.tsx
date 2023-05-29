import { FC } from "react";
import { useStyles } from "./AuthProtectedRoute.styles";
import { Outlet } from "react-router-dom";
import { DefaultLayout } from "@components/DefaultLayout";
import { useAuth, useSigninCheck } from "reactfire";
import { LoginPage } from "@pages/LoginPage";
import { signOut } from "firebase/auth";
import { Button } from "@mui/material";

interface Props {}

export const AuthProtectedRoute: FC<Props> = () => {
  const styles = useStyles();
  const { data: signInCheckResult } = useSigninCheck();
  const auth = useAuth();

  const logOut = () => {
    signOut(auth);
  };

  return (
    <>
      <Button onClick={logOut}>Log out </Button>
      <DefaultLayout>
        {!signInCheckResult.signedIn ? <LoginPage /> : <Outlet />}
        {/* <Outlet /> */}
      </DefaultLayout>
    </>
  );
};
