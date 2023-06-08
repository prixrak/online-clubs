import { FC } from "react";
import { useStyles } from "./CustomLink.styles";
import { Link } from "@mui/material";

export const CustomLink: FC<React.ComponentProps<typeof Link>> = (props) => {
  const styles = useStyles();
  return <Link sx={{ textDecoration: "none", color: "inherit" }} {...props} />;
};
