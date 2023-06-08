import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  root: {
    padding: 16,
    border: "1px solid #1A1D21",
    borderRadius: 16,
    width: "fit-content",
    maxWidth: "80%",
    wordBreak: "break-word",
  },
  content: {
    padding: "16px 0px",
  },
  userName: {
    fontWeight: 600,
    fontSize: 16,
    letterSpacing: 0.15,
    color: "#FFFFFF",
  },
  messageTime: {
    fontWeight: 500,
    fontSize: 12,
    letterSpacing: 0.15,
    color: "#686B6E",
    whiteSpace: "nowrap",
  },
  messageText: {
    fontWeight: 500,
    fontSize: 16,
    letterSpacing: 0.15,
    color: "#9B9C9E",
  },
});
