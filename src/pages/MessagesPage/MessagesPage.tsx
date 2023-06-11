import { FC, Suspense, useEffect, useRef, useState } from "react";
import { useStyles } from "./MessagesPage.styles";
import { useParams } from "react-router-dom";
import { useFirestore, useFirestoreCollectionData, useUser } from "reactfire";
import {
  CollectionReference,
  addDoc,
  collection,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { collections } from "@constants/collections";
import { IMessage } from "@interfaces/IMessage";
import { DataStatus } from "@enums/DataStatus";
import { Button, InputBase, Stack, TextField } from "@mui/material";
import { useCurrentUser } from "@hooks/useClubsCollectionRef";
import { Message } from "./components/Message";
import { CustomTextField } from "@components/CustomTextField";
import { ReactComponent as SubmitIcon } from "@assets/paper-plane.svg";

interface Props {}

export const MessagesPage: FC<Props> = () => {
  const styles = useStyles();
  const firestore = useFirestore();

  const [message, setMessage] = useState("");
  const { clubId, topicId } = useParams();
  const { currentUser } = useCurrentUser();
  const clubTopicMessagesRef = collection(
    firestore,
    `${collections.clubs}/${clubId}/${collections.topics}/${topicId}/${collections.messages}`
  ) as CollectionReference<IMessage>;
  const clubTopicMessagesQueryForGettingReverseMessages = query(
    clubTopicMessagesRef,
    orderBy("createdAt", "asc")
  );
  const {
    status: clubTopicMessagesCollectionLoadingStatus,
    data: clubTopicMessages,
  } = useFirestoreCollectionData(
    clubTopicMessagesQueryForGettingReverseMessages,
    {
      idField: "id",
    }
  );

  const sendMessage = () => {
    if (!message) {
      return;
    }
    const timestamp = serverTimestamp();

    addDoc<Omit<IMessage, "id">>(clubTopicMessagesRef, {
      text: message,
      createdBy: currentUser?.uid ?? "",
      createdAt: timestamp,
      updatedAt: timestamp,
    });
    setMessage("");
  };

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [clubTopicMessages]);

  return !clubId || !topicId ? null : (
    <Stack className={styles.root}>
      <Stack className={styles.messages} gap='16px' ref={scrollContainerRef}>
        {clubTopicMessages.map((message) => (
          <Message
            key={message.id}
            message={message}
            clubId={clubId}
            topicId={topicId}
          />
        ))}
      </Stack>
      <Stack
        className={styles.messageInputBlock}
        flexDirection='row'
        alignItems='center'
        justifyContent='space-between'
        gap='16px'>
        <InputBase
          fullWidth
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              sendMessage();
            }
          }}
          className={styles.input}
          placeholder='Write a message...'
          value={message}
          onChange={(event) => {
            setMessage(event.target.value);
          }}
        />
        <Button
          disabled={!message}
          onClick={sendMessage}
          className={styles.submitBtn}>
          <SubmitIcon />
        </Button>
      </Stack>
    </Stack>
  );
};
