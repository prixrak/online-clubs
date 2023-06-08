import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  root: {
    height: "100%",
  },
  topBar: {
    background: "#0D0F10",
    borderRadius: 20,
  },
  title: {
    fontWeight: 700,
    fontSize: 20,
    color: "#FFFFFF",
  },
  subTitle: {
    fontWeight: 600,
    fontSize: 14,
    letterSpacing: 0.15,
    color: "#9B9C9E",
  },
  header: {
    padding: 24,
    borderBottom: "1px solid #131619",
  },
  navigation: {
    padding: 24,
    gap: 24,
  },
  tabLogo: {
    width: 20,
    height: 20,
    stroke: "#686B6E",
  },
  text: {
    fontWeight: 600,
    fontSize: 14,
    letterSpacing: 0.15,
  },
  tab: {
    position: "relative",
    width: "fit-content",
    textDecoration: "none !important",
    color: "#9B9C9E !important",
  },
  tabIndicator: {
    position: "absolute",
    height: 4,
    left: 0,
    right: -1,
    bottom: -24,
    background: "#B6F09C",
    borderRadius: "4px 4px 0px 0px",
    boxShadow:
      "0px 10px 15px -3px rgba(182, 240, 156, 0.16), 0px 4px 6px -4px rgba(182, 240, 156, 0.16)",
  },
  activeTab: {
    color: "#E8E9E9 !important",
  },
  activeTabLogo: {
    stroke: "#B6F09C !important",
    boxShadow:
      "0px 10px 15px -3px rgba(182, 240, 156, 0.16), 0px 4px 6px -4px rgba(182, 240, 156, 0.16)",
  },
  subPage: {
    paddingTop: 24,
  },
});
