import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  root: {},
  uploadBlock: {
    display: "block",
    cursor: "pointer",
    width: 80,
    height: 80,

    "& svg": {
      width: 80,
      height: 80,
    },
  },
});
