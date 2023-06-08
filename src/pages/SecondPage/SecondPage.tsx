import { FC, Suspense } from "react";
import { useStyles } from "./SecondPage.styles";
import { CollectionReference, collection } from "firebase/firestore";
import { useFirestore, useFirestoreCollectionData } from "reactfire";
import { Outlet, Link as RectRouterLink, useParams } from "react-router-dom";
import { collections } from "@constants/collections";
import { ITopic } from "@interfaces/ITopic";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import { DataStatus } from "@enums/DataStatus";
import { paths } from "@constants/paths";
import { Grid, Link, ListItemButton } from "@mui/material";

interface Props {}

export const SecondPage: FC<Props> = () => {
  const styles = useStyles();
  const { clubId } = useParams();

  const firestore = useFirestore();

  const clubTopicsRef = collection(
    firestore,
    `${collections.clubs}/${clubId}/${collections.topics}`
  ) as CollectionReference<ITopic>;

  const { status: clubTopicsCollectionLoadingStatus, data: clubTopics } =
    useFirestoreCollectionData(clubTopicsRef, {
      idField: "id",
    });

  return (
    <Grid container spacing={2}>
      <Grid item xs={2}>
        <List>
          {clubTopics.map((topic) => (
            <Link
              component={RectRouterLink}
              key={topic.id}
              to={`${paths.club}/${clubId}/${paths.topic}/${topic.id}/${paths.messages}`}>
              <ListItemButton>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <ImageIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={topic.name}
                    secondary={topic.description}
                  />
                </ListItem>
              </ListItemButton>
            </Link>
          ))}
        </List>
      </Grid>
      <Grid item xs={10}>
        <Outlet />
      </Grid>
    </Grid>
  );
};
