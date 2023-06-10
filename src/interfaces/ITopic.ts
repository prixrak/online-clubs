import { Timestamp } from "firebase/firestore";

export interface ITopic {
  id: string;
  name: string;
  description: string;
  imgUrl: string;
  createdAt: Timestamp | null;
  updatedAt: Timestamp | null;
  createdBy: string | null;
}

export interface ITopicFormValues {
  name: string;
  description: string;
  image: File | null;
}
