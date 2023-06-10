import { FC, Suspense, useState } from "react";
import { useStyles } from "./MainPage.styles";
import { useFirestoreCollectionData, useUser } from "reactfire";
import { DataStatus } from "@enums/DataStatus";
import { ClubCard } from "./components/ClubCard";
import { Autocomplete, Grid, Stack, TextField } from "@mui/material";
import { useClubsCollectionRef } from "@hooks/useClubsCollectionRef";
import { query, where } from "firebase/firestore";
import { ClubType } from "@enums/ClubTypes";
import { ReactComponent as MainIcon } from "@assets/artWork.svg";
import SearchIcon from "@mui/icons-material/Search";
import { Loader } from "@components/Loader";
import { ClubsList } from "./components/ClubsList";
import { ClubCategory } from "@enums/ClubCategory";
interface Props {}

export const MainPage: FC<Props> = () => {
  const styles = useStyles();
  const [searchText, setSearchText] = useState("");

  interface IClubCategoryOption {
    value: ClubCategory;
    title: string;
  }
  const [clubType, setClubType] = useState(ClubType.Public);
  const [selectedCategories, setSelectedCategories] =
    useState<IClubCategoryOption[]>();

  const handleAutocompleteChange = (
    _: React.ChangeEvent<{}>,
    value: IClubCategoryOption[]
  ) => {
    setSelectedCategories(value);
  };
  console.log(selectedCategories);
  return (
    <Grid container rowGap='10px'>
      <Grid item xs={12}>
        <div
          style={{
            position: "relative",
          }}>
          <MainIcon
            style={{
              width: "100%",
              height: "100%",
            }}></MainIcon>
          <Stack
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              gap: "12px",
              textAlign: "center",
            }}>
            <div className={styles.title}>Discover more clubs</div>
            <div className={styles.subTitle}>
              From gaming, to music, to learning, there’s a place for you.
            </div>
            <TextField
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              fullWidth
              placeholder='Explore more clubs'
              variant='outlined'
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  backgroundColor: "white",
                },
                "& .MuiOutlinedInput-input": {
                  padding: "12px 20px",
                  fontSize: "16px",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
              }}
              InputProps={{
                endAdornment: <SearchIcon />,
              }}
            />
            <Autocomplete
              multiple
              options={Object.entries(ClubCategory).map(([key, value]) => ({
                title: key,
                value: value,
              }))}
              value={selectedCategories}
              onChange={handleAutocompleteChange}
              getOptionLabel={(option) => option.title}
              defaultValue={[]}
              classes={{ root: styles.autocomplete }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant='standard'
                  placeholder='Categories'
                />
              )}
            />
          </Stack>
        </div>
      </Grid>
      <Suspense fallback={<Loader />}>
        <ClubsList
          searchText={searchText}
          selectedCategories={
            selectedCategories?.map((category) => category.value) ?? []
          }
        />
      </Suspense>
    </Grid>
  );
};
