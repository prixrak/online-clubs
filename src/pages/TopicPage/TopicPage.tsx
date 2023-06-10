import { FC, Suspense } from "react";
import { useStyles } from "./TopicPage.styles";
import { Link, Stack, Typography } from "@mui/material";
import { useFirestore, useFirestoreDocData } from "reactfire";
import { DocumentReference, doc } from "firebase/firestore";
import { collections } from "@constants/collections";
import { Outlet, useParams } from "react-router-dom";
import { DataStatus } from "@enums/DataStatus";
import { ReactComponent as LogoIcon } from "@assets/logoIcon.svg";
import { ReactComponent as FilesIcon } from "@assets/files.svg";

import { NavLink as RectRouterLink } from "react-router-dom";
import { paths } from "@constants/paths";
import classNames from "classnames";
import { ITopic } from "@interfaces/ITopic";

interface Props {}

export const TopicPage: FC<Props> = () => {
  const styles = useStyles();
  const { clubId, topicId } = useParams();

  const firestore = useFirestore();

  const topicRef = doc(
    firestore,
    `${collections.clubs}/${clubId}/${collections.topics}/${topicId}`
  ) as DocumentReference<ITopic>;

  const { status: topicLoadingStatus, data: topic } = useFirestoreDocData(
    topicRef,
    {
      idField: "id",
    }
  );

  const isActiveTab = (path: string) => {
    return window.location.pathname.includes(path);
  };
  const tabs = [
    { name: "Chat", path: paths.messages, icon: LogoIcon },
    { name: "Files", path: paths.files, icon: FilesIcon },
  ];
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className={styles.root}>
        <Stack className={styles.topBar}>
          <Stack className={styles.header}>
            <Stack flexDirection='column' rowGap='4px'>
              <div className={styles.title}>{topic.name}</div>
              <div className={styles.subTitle}>{topic.description}</div>
            </Stack>
          </Stack>
          <Stack className={styles.navigation} flexDirection='row'>
            {tabs.map((tab) => (
              <Link
                key={tab.name}
                className={classNames(styles.tab, {
                  [styles.activeTab]: isActiveTab(tab.path),
                })}
                component={RectRouterLink}
                to={tab.path}>
                <Stack gap='12px' alignItems='center' flexDirection='row'>
                  <tab.icon
                    className={classNames(styles.tabLogo, {
                      [styles.activeTabLogo]: isActiveTab(tab.path),
                    })}
                  />
                  <div className={styles.text}>{tab.name}</div>
                  {isActiveTab(tab.path) && (
                    <div className={styles.tabIndicator}></div>
                  )}
                </Stack>
              </Link>
            ))}
          </Stack>
        </Stack>
        <div className={styles.subPage}>
          <Outlet />
        </div>
      </div>
    </Suspense>
  );
};
