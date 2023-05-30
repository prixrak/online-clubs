import { FC } from "react";
import { useStyles } from "./MainPage.styles";
import { useFirestore, useFirestoreCollectionData, useUser } from "reactfire";
import { CollectionReference, addDoc, collection } from "firebase/firestore";
import { DataStatus } from "@enums/DataStatus";
import { IClub } from "@interfaces/IClub";
import { collections } from "@constants/collections";
import { ClubCard } from "./components/ClubCard";
import { Grid } from "@mui/material";

interface Props {}

export const MainPage: FC<Props> = () => {
  const styles = useStyles();

  const { status, data: user } = useUser();

  const firestore = useFirestore();
  const clubsCollectionRef = collection(
    firestore,
    collections.clubs
  ) as CollectionReference<IClub>;

  const { status: clubsCollectionLoadingStatus, data: clubsCollection } =
    useFirestoreCollectionData(clubsCollectionRef, {
      idField: "id",
    });

  return clubsCollectionLoadingStatus === DataStatus.Loading ? (
    <div>LoADING</div>
  ) : (
    <div>
      <h1>Welcome Back, {user?.displayName}!</h1>
      <h2>Clubs collections</h2>
      <Grid container spacing={2}>
        {clubsCollection.map((club) => (
          <Grid key={club.id} item xs={3}>
            <ClubCard clubData={club} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
