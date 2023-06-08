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
  sideBar: {
    position: "fixed",
    minWidth: "312px",
    background: "#0D0F10",
    borderRadius: "20px",
    margin: "12px",
    height: "calc(100vh - 24px)",
    overflow: "hidden",
  },

  workSpace: {},
  blockTitle: {
    padding: "24px",
    fontWeight: 600,
    color: "#686B6E",
    fontSize: 12,
    letterSpacing: 0.15,
  },
  listContainer: {
    padding: "0px 8px",
  },
  listItem: {
    padding: "14px 16px",
    alignItems: "center",
    gap: "16px",
    borderRadius: 8,
    height: "48px",
    background:
      "linear-gradient(117.58deg, rgba(215, 237, 237, 0.16) -47.79%, rgba(204, 235, 235, 0) 100%)",
    fontWeight: 600,
    fontSize: 14,
    color: "#E8E9E9",
  },
});
