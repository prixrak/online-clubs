import { FC, Suspense, useEffect } from "react";
import { useStyles } from "./AuthProtectedRoute.styles";
import { Outlet, useNavigate } from "react-router-dom";
import { DefaultLayout } from "@components/DefaultLayout";
import { useSigninCheck } from "reactfire";
import { paths } from "@constants/paths";
import { DataStatus } from "@enums/DataStatus";
import { useCurrentUser } from "@hooks/useClubsCollectionRef";

interface Props {}

export const AuthProtectedRoute: FC<Props> = () => {
  const styles = useStyles();
  const { data: signInCheckResult, status } = useSigninCheck();
  const { currentUserLoadingStatus } = useCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!signInCheckResult.signedIn) {
      navigate(paths.login);
    }
  }, [signInCheckResult.signedIn]);

  return (
    <DefaultLayout>
      <Outlet />
    </DefaultLayout>
  );
};
