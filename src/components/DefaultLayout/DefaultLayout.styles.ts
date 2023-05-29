import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  root: {
    position: "relative",
    display: "flex",
    minHeight: "100vh",
    paddingTop: 0,
    transition: "padding-top 0.35s",
  },

  body: {
    position: "relative",
    flex: 1,
    padding: "0 40px",
    minHeight: "100vh",
  },
  notificationsHolder: {
    position: "fixed",
    bottom: 0,
    zIndex: 3,
    left: 0,
    right: 0,
    pointerEvents: "none",
  },
});
