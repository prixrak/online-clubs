import { FC, ReactNode } from "react";
import { useStyles } from "./DefaultLayout.styles";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { paths } from "@constants/paths";

interface Props {
  children: ReactNode;
}

export const DefaultLayout: FC<Props> = ({ children }) => {
  const styles = useStyles();

  return (
    <div className={classNames(styles.root)} id='layout-root'>
      <Link to={paths.home}>Home</Link>
      <Link to={paths.second}>Second</Link>
      <div className={styles.body}>{children}</div>
      <div className={styles.notificationsHolder}>
        {/* <RockyNotifications></RockyNotifications> */}
      </div>
    </div>
  );
};
