import { FC, ReactNode, Suspense } from "react";
import { useStyles } from "./DefaultLayout.styles";
import { Avatar, Box, Button, List, Stack } from "@mui/material";
import { useAuth, useFirestoreCollectionData } from "reactfire";
import { signOut } from "firebase/auth";
import { deepOrange } from "@mui/material/colors";
import { useModalState } from "@hooks/useModalState";
import { CreateClubModal } from "@components/CreateClubModal";
import { CustomAvatar } from "@components/CustomAvatar";
import { useNavigate } from "react-router-dom";
import { paths } from "@constants/paths";
import { useClubsCollectionRef } from "@hooks/useClubsCollectionRef";

interface Props {
  children: ReactNode;
}

export const DefaultLayout: FC<Props> = ({ children }) => {
  const styles = useStyles();
  const auth = useAuth();

  const navigate = useNavigate();
  const logOut = async () => {
    await signOut(auth);
    navigate(paths.login);
  };

  const { isModalOpen, openModal, closeModal } = useModalState();

  const { clubsCollectionRef } = useClubsCollectionRef();

  const { status: clubsCollectionLoadingStatus, data: clubsCollection } =
    useFirestoreCollectionData(clubsCollectionRef, {
      idField: "id",
    });
  return (
    <div className={styles.root}>
      <Stack className={styles.sideBar}>
        <Stack flexDirection='row' className={styles.workSpace}>
          <Stack width='100%'>
            <Stack>
              <div className={styles.blockTitle}>CLUBS</div>
            </Stack>
            <Stack className={styles.listContainer}>
              {clubsCollection.map(({ id, name, imgUrl }) => (
                <Stack key={id} flexDirection='row' className={styles.listItem}>
                  <CustomAvatar src={imgUrl} sx={{ width: 36, height: 36 }} />
                  <div>{name}</div>
                </Stack>
              ))}
            </Stack>
          </Stack>
        </Stack>
        <Button onClick={openModal}>Create club </Button>
      </Stack>
      <Button onClick={logOut}>Log out </Button>
      {/* 
      <Link to={paths.home}>Home</Link>
      <Link to={paths.second}>Second</Link> */}
      <Suspense fallback={<div>sa'das'd'asd'as'd</div>}>
        <div className={styles.body}>{children}</div>
      </Suspense>

      <div className={styles.notificationsHolder}>
        {/* <RockyNotifications></RockyNotifications> */}
      </div>
      <CreateClubModal open={isModalOpen} onClose={closeModal} />
    </div>
  );
};
