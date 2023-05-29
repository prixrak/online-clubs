import { FC } from "react";
import { useStyles } from "./ClubCard.styles";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Card, CardActionArea, Link } from "@mui/material";
import { IClub } from "@interfaces/IClub";
import { paths } from "@constants/paths";
import { Link as RectRouterLink } from "react-router-dom";

interface Props {
  clubData: IClub;
}

export const ClubCard: FC<Props> = ({ clubData }) => {
  const styles = useStyles();
  return (
    <Link
      component={RectRouterLink}
      to={`${paths.club}/${clubData.id}`}
      sx={{ textDecoration: "none" }}>
      <Card>
        <CardActionArea>
          <CardMedia
            component='img'
            height='140'
            image={clubData.imgUrl}
            alt='green iguana'
          />
          <CardContent>
            <Typography gutterBottom variant='h5' component='div'>
              {clubData.name}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {clubData.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};
