import { FC, Suspense } from "react";
import { useStyles } from "./MainPage.styles";
import { useFirestoreCollectionData, useUser } from "reactfire";
import { DataStatus } from "@enums/DataStatus";
import { ClubCard } from "./components/ClubCard";
import { Grid } from "@mui/material";
import { useClubsCollectionRef } from "@hooks/useClubsCollectionRef";

interface Props {}

export const MainPage: FC<Props> = () => {
  const styles = useStyles();

  const { status, data: user } = useUser();

  const { clubsCollectionRef } = useClubsCollectionRef();

  const { status: clubsCollectionLoadingStatus, data: clubsCollection } =
    useFirestoreCollectionData(clubsCollectionRef, {
      idField: "id",
    });

  return (
    <Grid container spacing={2}>
      {clubsCollection.map((club) => (
        <Grid key={club.id} item xs={3}>
          <ClubCard clubData={club} />
        </Grid>
      ))}
    </Grid>
  );
};
