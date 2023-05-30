import { FC, ReactNode } from "react";
import { useStyles } from "./DefaultLayout.styles";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { paths } from "@constants/paths";
import { Button } from "@mui/material";
import { useAuth } from "reactfire";
import { signOut } from "firebase/auth";

interface Props {
  children: ReactNode;
}

export const DefaultLayout: FC<Props> = ({ children }) => {
  const styles = useStyles();
  const auth = useAuth();

  const logOut = () => {
    signOut(auth);
  };

  return (
    <div className={classNames(styles.root)} id='layout-root'>
      <Button onClick={logOut}>Log out </Button>

      <Link to={paths.home}>Home</Link>
      <Link to={paths.second}>Second</Link>
      <div className={styles.body}>{children}</div>
      <div className={styles.notificationsHolder}>
        {/* <RockyNotifications></RockyNotifications> */}
      </div>
    </div>
  );
};
