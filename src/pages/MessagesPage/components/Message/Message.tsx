import { FC, Suspense } from "react";
import { useStyles } from "./Message.styles";
import { CustomAvatar } from "@components/CustomAvatar";
import { IMessage } from "@interfaces/IMessage";
import { Stack } from "@mui/material";
import format from "date-fns/format";
import { useCurrentUser, useUser } from "@hooks/useClubsCollectionRef";

interface Props {
  message: IMessage;
}

export const Message: FC<Props> = ({ message }) => {
  const styles = useStyles();
  const { currentUser } = useCurrentUser();
  const createdAt = message.createdAt
    ? format(message.createdAt.toDate(), "HH:mm")
    : "...";

  const { user } = useUser({ userId: message.createdBy });

  return (
    <Stack
      flexDirection='row'
      alignItems='flex-start'
      marginLeft={currentUser?.uid === message.createdBy ? "auto" : "0"}
      gap='24px'
      className={styles.root}>
      {currentUser?.uid === message.createdBy ? (
        <Stack flexDirection='row' gap='16px' alignItems='flex-start'>
          <div className={styles.messageText}>{message.text}</div>

          <div className={styles.messageTime}>{createdAt}</div>
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
