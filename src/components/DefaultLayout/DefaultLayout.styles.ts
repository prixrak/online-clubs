import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  root: {
    position: "relative",
    minHeight: "100vh",
    padding: 0,
    background: "#131619",
    display: "flex",
    flexDirection: "row",
  },
  body: {
    minHeight: "100vh",
    background: "#131619",
    marginLeft: "336px",
    padding: "12px",
    width: "100%",
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
