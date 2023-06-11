import { FC, Suspense, useEffect, useState } from "react";
import { useStyles } from "./SideBar.styles";
import {
  Avatar,
  Box,
  Button,
  Link,
  List,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import { useAuth, useFirestore, useFirestoreCollectionData } from "reactfire";
import { signOut } from "firebase/auth";
import { useModalState } from "@hooks/useModalState";
import { CreateClubModal } from "@components/CreateClubModal";
import { CustomAvatar } from "@components/CustomAvatar";
import { useNavigate, useParams } from "react-router-dom";
import { paths } from "@constants/paths";
import {
  useClub,
  useClubsCollectionRef,
  useCurrentUser,
  useMyClubsCollectionRef,
  useTopics,
} from "@hooks/useClubsCollectionRef";
import { MAIN_TOPIC_ID } from "@constants/ids";
import Groups3OutlinedIcon from "@mui/icons-material/Groups3Outlined";
import { NavLink as RectRouterLink } from "react-router-dom";
import classNames from "classnames";
import {
  CollectionReference,
  addDoc,
  doc,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { collection, documentId } from "firebase/firestore";
import { DataStatus } from "@enums/DataStatus";
import { ReactComponent as PlusCircleIcon } from "@assets/plus-circle.svg";
import { CreateTopicModal } from "@components/CreateTopicModal";
import { ReactComponent as LogoIcon } from "@assets/logoIcon.svg";
import { collections } from "@constants/collections";
import { Roles } from "@enums/Roles";
import { IClubMember } from "@interfaces/IUser";

interface Props {}

export const SideBar: FC<Props> = () => {
  const styles = useStyles();
  const auth = useAuth();
  const { clubId } = useParams();

  const navigate = useNavigate();
  const logOut = async () => {
    await signOut(auth);
    navigate(paths.login);
  };
  const { currentUser } = useCurrentUser();

  const {
    isModalOpen: isNewClubModalOpen,
    openModal: openNewClubModal,
    closeModal: closeNewClubModal,
  } = useModalState();

  const {
    isModalOpen: isNewTopicModalOpen,
    openModal: openNewTopicModal,
    closeModal: closeNewTopicModal,
  } = useModalState();

  const { myClubsCollectionRef } = useMyClubsCollectionRef();
  const { status: myClubsCollectionLoadingStatus, data: myClubsCollection } =
    useFirestoreCollectionData(myClubsCollectionRef, {
      idField: "id",
    });
  const { clubsCollectionRef } = useClubsCollectionRef();

  const q = query(
    clubsCollectionRef,
    where(
      documentId(),
      "in",
      myClubsCollection.length > 0
        ? myClubsCollection.map(({ id }) => id)
        : ["0"]
    )
  );
  const { status: clubsCollectionLoadingStatus, data: clubsCollection } =
    useFirestoreCollectionData(q, {
      idField: "id",
    });

  const { club } = useClub({ clubId: clubId ?? "0" });
  const { topics, topicsLoadingStatus } = useTopics({ clubId: clubId ?? "0" });
  const isTopics = topics.length > 0;
  const isActiveTab = (path: string) => {
    return window.location.pathname.includes(path);
  };
  const [isShownTopics, setIsShownTopics] = useState(isTopics);
  const displayItems = isShownTopics
    ? topics.sort((topic1, topic2) =>
        topic1?.createdAt?.seconds &&
        topic2?.createdAt?.seconds &&
        topic1?.createdAt?.seconds < topic2?.createdAt?.seconds
          ? -1
          : 1
      )
    : clubsCollection;

  useEffect(() => {
    setIsShownTopics(isTopics);
  }, [isTopics]);
  const isCanCreateTopic = currentUser?.uid === club?.createdBy;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const firestore = useFirestore();
  const clubMembersCollectionRef = collection(
    firestore,
    `${collections.clubs}/${club?.id}/${collections.members}`
  ) as CollectionReference<IClubMember>;

  const { data: clubMembers } = useFirestoreCollectionData(
    clubMembersCollectionRef,
    {
      idField: "id",
    }
  );

  const joinClub = () => {
    if (!club) {
      return;
    }
    setDoc(
      doc(
        firestore,
        `${collections.users}/${currentUser?.uid}/${collections.myClubs}/${club.id}`
      ),
      {}
    );
    setDoc(
      doc(
        firestore,
        `${collections.clubs}/${club?.id}/${collections.members}/${currentUser?.uid}`
      ),
      { role: Roles.Member }
    );
    addDoc<Omit<IClubMember, "id">>(clubMembersCollectionRef, {
      role: Roles.Member,
    });
  };

  return (
    <>
      <Stack className={styles.sideBar}>
        <Stack flexDirection='row' className={styles.workSpace}>
          <Stack width='100%'>
            <div className={styles.mainBlockContainer}>
              {club ? (
                <Stack direction='row' className={styles.mainBlock}>
                  <CustomAvatar
                    sx={{
                      width: 48,
                      height: 48,
                    }}
                    src={club?.imgUrl}
                  />
                  <Stack gap='4px'>
                    <div className={styles.mainBlockTitle}>{club?.name}</div>
                    <div className={styles.mainBlockSubTitle}>
                      {`${clubMembers.length} member${
                        clubMembers.length > 1 ? "s" : ""
                      }`}
                    </div>
                  </Stack>
                  {!clubMembers.some(
                    (clubMember) => clubMember.id === currentUser?.uid
                  ) && (
                    <Button
                      color='secondary'
                      size='medium'
                      variant='text'
                      sx={{
                        width: "fit-content",
                        textTransform: "none",
                        marginLeft: "auto",
                        height: "fit-content",
                      }}
                      onClick={joinClub}>
                      Join club
                    </Button>
                  )}
                </Stack>
              ) : (
                <Stack flexDirection='row' alignItems='center' gap='16px'>
                  <LogoIcon
                    style={{
                      width: 48,
                      height: 48,
                      stroke: "#82DBF7 ",
                    }}
                  />
                  <div
                    style={{
                      fontSize: 24,
                      background:
                        "linear-gradient(45deg, #82DBF7 0%, #B6F09C 100%)",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}>
                    IT's my world
                  </div>
                </Stack>
              )}
            </div>
            <Stack>
              <Stack className={styles.pages}>
                <div className={styles.blockTitle}>GENERAL</div>
                <Stack className={styles.listContainer}>
                  <Link
                    className={classNames(styles.listItem, {
                      [styles.listItemActive]: isActiveTab(paths.home),
                    })}
                    component={RectRouterLink}
                    to={paths.home}>
                    <Groups3OutlinedIcon />
                    <div>Discover more clubs</div>
                  </Link>
                </Stack>
              </Stack>
            </Stack>
            <Stack>
              <Stack flexDirection='row' alignItems='center'>
                <div className={styles.blockTitle}>
                  {isShownTopics ? "TOPICS" : "MY CLUBS"}
                </div>
                {isShownTopics && (
                  <Button
                    color='secondary'
                    size='medium'
                    variant='text'
                    sx={{
                      width: "fit-content",
                      textTransform: "none",
                      marginLeft: "auto",
                      height: "fit-content",
                    }}
                    onClick={() => setIsShownTopics(false)}>
                    Go to my clubs
                  </Button>
                )}
              </Stack>

              <Stack className={styles.topicsCont}>
                {displayItems.map(({ id, name, imgUrl }) => (
                  <Link
                    key={id}
                    className={classNames(styles.listItem, {
                      [styles.listItemActive]: isActiveTab(id),
                    })}
                    onClick={() => {
                      if (!isShownTopics) {
                        setIsShownTopics(true);
                      }
                    }}
                    component={RectRouterLink}
                    to={`${paths.club}/${!isShownTopics ? id : clubId}/${
                      paths.topic
                    }/${isShownTopics ? id : MAIN_TOPIC_ID}/${paths.messages}`}>
                    <CustomAvatar src={imgUrl} sx={{ width: 36, height: 36 }} />
                    <div>{name}</div>
                  </Link>
                ))}
                {isShownTopics && !isCanCreateTopic ? null : (
                  <Button
                    color='secondary'
                    size='medium'
                    variant='text'
                    onClick={
                      isShownTopics ? openNewTopicModal : openNewClubModal
                    }
                    sx={{
                      width: "100%",
                      padding: "5px 24px",
                      textTransform: "none",
                      justifyContent: "flex-start",
                      marginTop: "5px",
                      position: "sticky",
                      bottom: 0,
                      backgroundColor: "#0D0F10",
                      "&:hover": {
                        backgroundColor: "#1A1D21",
                      },
                    }}>
                    <Stack direction='row' gap='4px' alignItems='center'>
                      <PlusCircleIcon />
                      Create new {isShownTopics ? "topic" : "club"}
                    </Stack>
                  </Button>
                )}
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <div className={styles.userBlock} onClick={handleClick}>
          <Stack direction='row' className={styles.mainBlock}>
            <CustomAvatar
              sx={{
                width: 48,
                height: 48,
              }}
              src={currentUser?.photoURL ?? undefined}
            />
            <Stack gap='4px'>
              <div className={styles.mainBlockTitle}>
                {currentUser?.displayName}
              </div>
              <div className={styles.mainBlockSubTitle}>
                {currentUser?.email}
              </div>
            </Stack>
          </Stack>
        </div>
        <Menu
          sx={{
            "& .MuiPaper-root": {
              backgroundColor: "#1E1E1E",
              color: "#fff",
            },
          }}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          transformOrigin={{ vertical: "bottom", horizontal: "center" }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            style: {
              width: anchorEl ? anchorEl.clientWidth + "px" : "auto",
            },
          }}>
          <MenuItem
            onClick={() => {
              logOut();
              handleClose();
            }}>
            Logout
          </MenuItem>
        </Menu>

        {/* <Button onClick={logOut}>Log out </Button> */}
      </Stack>
      <CreateClubModal open={isNewClubModalOpen} onClose={closeNewClubModal} />
      {clubId && (
        <CreateTopicModal
          open={isNewTopicModalOpen}
          onClose={closeNewTopicModal}
          clubId={clubId}
        />
      )}
    </>
  );
};
