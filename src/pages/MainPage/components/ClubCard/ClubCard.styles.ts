import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  root: {
    height: "320px",
    background:
      "linear-gradient(117.58deg, rgba(215, 237, 237, 0.16) -1.79%, rgba(204, 235, 235, 0) 100%)",
    borderRadius: 6,
    color: "#9B9C9E",
  },
  glow: {
    position: "absolute",
    width: "100px",
    height: "100px",
    left: "48px",
    top: "48px",
    background: "#FFD147",
    opacity: 0.12,
    filter: "blur(36px)",
  },
  body: {
    padding: "32px 16px 16px 16px",
    position: "relative",
  },
  imgContainer: {
    position: "relative",
  },
});
