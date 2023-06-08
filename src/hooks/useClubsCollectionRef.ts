import { collections } from "@constants/collections";
import { DataStatus } from "@enums/DataStatus";
import { IClub } from "@interfaces/IClub";
import { ITopic } from "@interfaces/ITopic";
import { IUser } from "@interfaces/IUser";

import {
  CollectionReference,
  DocumentReference,
  collection,
  doc,
} from "firebase/firestore";
import { useAuth, useFirestore, useFirestoreDocData } from "reactfire";

export const useClubsCollectionRef = (): {
  clubsCollectionRef: CollectionReference<IClub>;
} => {
  const firestore = useFirestore();
  const clubsCollectionRef = collection(
    firestore,
    collections.clubs
  ) as CollectionReference<IClub>;
  return {
    clubsCollectionRef,
  };
};

export const useTopicsCollectionRef = ({
  clubId,
}: {
  clubId: string;
}): {
  topicsCollectionRef: CollectionReference<ITopic>;
} => {
  const firestore = useFirestore();
  const topicsCollectionRef = collection(
    firestore,
    `${collections.clubs}/${clubId}/${collections.topics}`
  ) as CollectionReference<ITopic>;
  return {
    topicsCollectionRef,
  };
};

export const useUsersCollectionRef = (): {
  usersCollectionRef: CollectionReference<IUser>;
} => {
  const firestore = useFirestore();
  const usersCollectionRef = collection(
    firestore,
    collections.users
  ) as CollectionReference<IUser>;
  return {
    usersCollectionRef,
  };
};

export const useCurrentUser = (): {
  currentUser: IUser | null;
  currentUserLoadingStatus: DataStatus;
} => {
  const auth = useAuth();
  const { currentUser } = auth;
  const firestore = useFirestore();

  if (!currentUser) {
    return { currentUser: null, currentUserLoadingStatus: DataStatus.Error };
  }
  const userRef = doc(
    firestore,
    `${collections.users}/${currentUser.uid}`
  ) as DocumentReference<IUser>;

  const { status, data } = useFirestoreDocData(userRef);

  return {
    currentUser: data,
    currentUserLoadingStatus: status as DataStatus,
  };
};

export const useUser = ({
  userId,
}: {
  userId: string;
}): {
  user: IUser | null;
  userLoadingStatus: DataStatus;
} => {
  const firestore = useFirestore();

  const userRef = doc(
    firestore,
    `${collections.users}/${userId}`
  ) as DocumentReference<IUser>;

  const { status: userLoadingStatus, data: user } =
    useFirestoreDocData(userRef);

  return {
    user,
    userLoadingStatus: userLoadingStatus as DataStatus,
  };
};

export const useClub = ({
  clubId,
}: {
  clubId: string;
}): {
  club: IClub | null;
  clubLoadingStatus: DataStatus;
} => {
  const firestore = useFirestore();

  const clubRef = doc(
    firestore,
    `${collections.clubs}/${clubId}`
  ) as DocumentReference<IClub>;

  const { status: clubLoadingStatus, data: club } =
    useFirestoreDocData(clubRef);

  return {
    club,
    clubLoadingStatus: clubLoadingStatus as DataStatus,
  };
};
