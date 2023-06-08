import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  root: {},
  messages: {
    height: "calc(100vh - 327px)",
    overflowY: "scroll",
    overflowX: "hidden",
    padding: "0px 20px",
    paddingBottom: 20,
  },
  messageInputBlock: {
    padding: 24,
    background: "#0D0F10",
    borderRadius: 20,
  },
  input: {
    color: "#fff !important",
  },
  submitBtn: {
    justifyContent: "center",
    alignItems: "center",
    width: "48px !important",
    height: "48px !important",
    background: "#1A1D21 !important",

    borderRadius: "12px !important",
  },
});
