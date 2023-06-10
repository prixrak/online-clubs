import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  root: {
    background: "rgba(6, 7, 8, 0.64)",
    backdropFilter: "blur(4px)",
  },
  body: {
    background: "rgba(26, 29, 33, 0.96)",
    boxShadow:
      " 0px 24px 64px -16px rgba(0, 0, 0, 0.24), inset 16px 24px 64px -24px rgba(255, 255, 255, 0.04), inset 0px 8px 12px rgba(255, 255, 255, 0.04)",
    borderRadius: 16,
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 520,
    height: 520,
    padding: 40,
    color: "#9B9C9E",
  },
});
