import { FC } from "react";
import { useStyles } from "./ClubCard.styles";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Card, CardActionArea, Link, Stack } from "@mui/material";
import { IClub } from "@interfaces/IClub";
import { paths } from "@constants/paths";
import { Link as RectRouterLink } from "react-router-dom";
import { CustomAvatar } from "@components/CustomAvatar";

interface Props {
  clubData: IClub;
}

export const ClubCard: FC<Props> = ({ clubData }) => {
  const styles = useStyles();
  return (
    <Link
      component={RectRouterLink}
      to={`${paths.club}/${clubData.id}`}
      sx={{ textDecoration: "none", color: "inherit" }}>
      <Stack className={styles.root}>
        <div className={styles.imgContainer}>
          <CardMedia
            sx={{
              height: 140,
              borderTopRightRadius: "6px",
              borderTopLeftRadius: "6px",
            }}
            image={clubData.imgUrl}
            title='green iguana'
          />
          <Stack
            sx={{
              background: "#131619",
              position: "absolute",
              transform: "translate(50%, -50%)",
              padding: "6px",
              borderRadius: "12px",
            }}>
            <CardMedia
              sx={{
                height: 40,
                width: 40,
                borderTopRightRadius: "6px",
                borderTopLeftRadius: "6px",
              }}
              image={clubData.imgUrl}
              title='green iguana'
            />
          </Stack>
        </div>
        <Stack className={styles.body}>
          <Typography
            sx={{
              background: "linear-gradient(45deg, #82DBF7 0%, #B6F09C 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
            gutterBottom
            variant='h5'
            component='div'>
            {clubData.name}
          </Typography>
          <Typography variant='body2'>
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
          <div className={styles.glow}></div>
        </Stack>
      </Stack>
    </Link>
  );
};
