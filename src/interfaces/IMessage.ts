import { Timestamp } from "firebase/firestore";

export interface IMessage {
  id: string;
  text: string;
  createdBy: string;
  updatedAt: Timestamp | null;
  createdAt: Timestamp | null;
}
