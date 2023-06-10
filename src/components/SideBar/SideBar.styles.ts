import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
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
  topicsCont: {
    padding: "0px 8px",
    height: "calc(100vh - 427px)",
    overflowY: "scroll",
    overflowX: "hidden",
    paddingBottom: 20,
    position: "relative",
  },
  listItem: {
    textDecoration: "none !important",
    padding: "14px 16px",
    alignItems: "center",
    gap: "16px",
    borderRadius: 8,
    height: "48px",

    fontWeight: 600,
    fontSize: 14,
    color: "#E8E9E9 !important",
    flexDirection: "row",
    display: "flex",
  },
  listItemActive: {
    background:
      "linear-gradient(117.58deg, rgba(215, 237, 237, 0.16) -47.79%, rgba(204, 235, 235, 0) 100%)",
  },
  mainBlockContainer: {
    padding: "24px",
    borderBottom: "1px solid #131619",
  },
  mainBlock: {
    gap: "16px",
    alignItems: "center",
  },
  mainBlockTitle: {
    fontWeight: 600,
    fontSize: 16,
    color: "#FFFFFF",
  },
  mainBlockSubTitle: {
    fontWeight: 500,
    fontSize: 12,
    color: "#B6F09C",
  },
  pages: {
    paddingBottom: "24px",
    borderBottom: "1px solid #131619",
  },
  messageInputBlock: {
    padding: 24,
    background: "#0D0F10",
    borderRadius: 20,
  },
  userBlock: {
    cursor: "pointer",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "16px",
    background:
      "linear-gradient(117.58deg, rgba(215, 237, 237, 0.16) -47.79%, rgba(204, 235, 235, 0) 100%)",
    borderRadius: "16px",
    padding: "16px",
    margin: "0px 8px",
  },
});
