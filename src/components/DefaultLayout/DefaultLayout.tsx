import { FC, ReactNode, Suspense, useEffect } from "react";
import { useStyles } from "./DefaultLayout.styles";
import { SideBar } from "@components/SideBar";
import { Loader } from "@components/Loader";

interface Props {
  children: ReactNode;
}

export const DefaultLayout: FC<Props> = ({ children }) => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Suspense fallback={<Loader />}>
        <SideBar />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <div className={styles.body}>{children}</div>
      </Suspense>
      <div className={styles.notificationsHolder}>
        {/* <RockyNotifications></RockyNotifications> */}
      </div>
    </div>
  );
};
