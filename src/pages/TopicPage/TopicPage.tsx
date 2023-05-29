import { FC, useState } from "react";
import { useStyles } from "./TopicPage.styles";
import { Button, TextField } from "@mui/material";
import { useFirestore, useFirestoreCollectionData, useUser } from "reactfire";
import {
  CollectionReference,
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { collections } from "@constants/collections";
import { useParams } from "react-router-dom";
import { DataStatus } from "@enums/DataState";
import { IMessage } from "@interfaces/IMessage";

interface Props {}

export const TopicPage: FC<Props> = () => {
  const styles = useStyles();
  const [message, setMessage] = useState("");
  const { id, topicId } = useParams();
  const { status: userLoadingStatus, data: user } = useUser();

  const firestore = useFirestore();
  const clubTopicMessagesRef = collection(
    firestore,
    `${collections.clubs}/${id}/${collections.topics}/${topicId}/${collections.messages}`
  ) as CollectionReference<IMessage>;

  const {
    status: clubTopicMessagesCollectionLoadingStatus,
    data: clubTopicMessages,
  } = useFirestoreCollectionData(clubTopicMessagesRef, {
    idField: "id",
  });

  const sendMessage = async () => {
    console.log("send message");
    if (userLoadingStatus === DataStatus.Success) {
      await addDoc<Omit<IMessage, "id">>(clubTopicMessagesRef, {
        text: message,
        userId: user?.uid ?? "",
        createdAt: serverTimestamp(),
      });
      setMessage("");
    }
  };

  return (
    <div className={styles.root}>
      <div>
        {clubTopicMessagesCollectionLoadingStatus === DataStatus.Loading ? (
          <div>loading</div>
        ) : (
          clubTopicMessages.map((message) => (
            <div key={message.id}>{message.text}</div>
          ))
        )}
      </div>
      <div>
        <TextField
          placeholder='type here'
          variant='standard'
          value={message}
          onChange={(event) => {
            setMessage(event.target.value);
          }}
        />
        <Button onClick={sendMessage}>Send msg</Button>
      </div>
    </div>
  );
};
