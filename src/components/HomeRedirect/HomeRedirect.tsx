import { paths } from "@constants/paths";
import { Link } from "@mui/material";
import { FC } from "react";
import { Link as RectRouterLink } from "react-router-dom";

export const HomeRedirect: FC = () => {
  return (
    <Link component={RectRouterLink} to={paths.home}>
      No such page, click here to go home
    </Link>
  );
};
