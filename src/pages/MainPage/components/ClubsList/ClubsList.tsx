import { FC } from "react";
import { useStyles } from "./ClubsList.styles";
import { Grid } from "@mui/material";
import { ClubCard } from "../ClubCard";
import { IClub } from "@interfaces/IClub";
import { useClubsCollectionRef } from "@hooks/useClubsCollectionRef";
import { ClubType } from "@enums/ClubTypes";
import { query, where } from "firebase/firestore";
import { useFirestoreCollectionData } from "reactfire";
import { ClubCategory } from "@enums/ClubCategory";

interface Props {
  searchText: string;
  selectedCategories: ClubCategory[];
}

export const ClubsList: FC<Props> = ({ searchText, selectedCategories }) => {
  const styles = useStyles();
  const { clubsCollectionRef } = useClubsCollectionRef();
  const q = query(
    clubsCollectionRef,
    where("type", "==", ClubType.Public),
    where("nameLowercase", ">=", searchText.toLowerCase()),
    where("nameLowercase", "<=", searchText.toLowerCase() + "\uf8ff"),
    where(
      "categories",
      "array-contains-any",
      selectedCategories.length > 0
        ? selectedCategories
        : (Object.values(ClubCategory) as ClubCategory[])
    )
  );

  const { status: clubsCollectionLoadingStatus, data: clubsCollection } =
    useFirestoreCollectionData(q, {
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
