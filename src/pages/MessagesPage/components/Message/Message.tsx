import { FC } from "react";
import { useStyles } from "./Message.styles";
import { CustomAvatar } from "@components/CustomAvatar";
import { IMessage } from "@interfaces/IMessage";
import { Button, Stack } from "@mui/material";
import format from "date-fns/format";
import { useCurrentUser, useUser } from "@hooks/useClubsCollectionRef";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { deleteDoc, doc } from "firebase/firestore";
import { useFirestore } from "reactfire";
import { paths } from "@constants/paths";
import { collections } from "@constants/collections";
interface Props {
  message: IMessage;
  clubId: string;
  topicId: string;
}

export const Message: FC<Props> = ({ message, clubId, topicId }) => {
  const styles = useStyles();
  const { currentUser } = useCurrentUser();
  const createdAt = message.createdAt
    ? format(message.createdAt.toDate(), "HH:mm")
    : "...";

  const { user } = useUser({ userId: message.createdBy });
  const firestore = useFirestore();

  const isCurrentUserMessage = currentUser?.uid === message.createdBy;
  const deleteMessage = () => {
    deleteDoc(
      doc(
        firestore,
        `${collections.clubs}/${clubId}/${collections.topics}/${topicId}/${collections.messages}/${message.id}`
      )
    );
  };

  return (
    <Stack
      flexDirection='row'
      alignItems='flex-start'
      marginLeft={isCurrentUserMessage ? "auto" : "0"}
      gap='24px'
      className={styles.root}>
      {isCurrentUserMessage ? (
        <Stack
          flexDirection='row'
          gap='16px'
          alignItems='flex-start'
          className={styles.messageBlock}>
          <div className={styles.messageText}>{message.text}</div>
          <Stack alignItems='center' gap='10px'>
            <div className={styles.messageTime}>{createdAt}</div>
            <Button onClick={deleteMessage}>
              <DeleteForeverOutlinedIcon sx={{ color: "#fff" }} />
            </Button>
          </Stack>
        </Stack>
      ) : (
        <>
          <CustomAvatar
            sx={{
              width: "48px",
              height: "48px",
              borderRadius: "20px",
            }}
            src={user?.photoURL ?? undefined}
          />
          <Stack className={styles.content} gap='28px'>
            <Stack flexDirection='row' gap='16px' alignItems='center'>
              <div className={styles.userName}>{user?.displayName}</div>
              <div className={styles.messageTime}>{createdAt}</div>
            </Stack>
            <div className={styles.messageText}>{message.text}</div>
          </Stack>
        </>
      )}
    </Stack>
  );
};
