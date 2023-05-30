import { makeStyles } from "@mui/styles";

const textFieldAnim = {
  transition: "0.1s",
  boxShadow: "0px 0px 0px 4px rgba(132, 220, 245, 0.24)",
  "& fieldset": {
    borderColor: "#84DCF5",
  },
};

export const useStyles = makeStyles({
  root: {
    background: "#131619",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "row",
  },
  leftBlock: {
    padding: 48,
    color: "#9B9C9E",
  },
  signUpLink: {
    background: "linear-gradient(45deg, #82DBF7 0%, #B6F09C 100%)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    marginLeft: 8,
  },
  leftBlockContent: {
    margin: "60px",
    display: "flex",
    justifyContent: "center",
  },
  leftBlockHeading: {
    marginBottom: 64,
  },
  leftBlockTitle: {
    fontSize: 36,
    fontWeight: 400,
    color: "#fff",
  },
  leftBlockTitleGradient: {
    background:
      "linear-gradient(45deg, #4D62E5 0%, #87DDEE 45.31%, #B6F09C 100%), linear-gradient(0deg, #FFFFFF, #FFFFFF), linear-gradient(0deg, #FFFFFF, #FFFFFF);",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  leftBlockSubtitle: {
    fontSize: 16,
    fontWeight: 500,
    letterSpacing: 0.15,
    lineHeight: "160%",
  },
  textField: {
    "& .MuiOutlinedInput-root": {
      borderRadius: 8,
      background: "#1A1D21",
      border: "1px solid #363A3D",
      height: 48,
      color: "#fff",

      "&:hover": textFieldAnim,

      '&[class*="Mui-focused"]': textFieldAnim,
    },
  },
  leftBlockForm: {},
  divider: {
    border: "1px solid #363A3D",
    width: "100%",
  },
  btn: {
    borderRadius: "12px !important",
    height: "48px !important",
    fontWeight: "600px !important",
    fontSize: "16px !important",
    textTransform: "none !important" as any,
  },
  loginBtn: {
    background: "#B6F09C !important",
    color: "#0C1132 !important",
  },
  loginBtnUsingAnotherResource: {
    background: "#1A1D21 !important",
    color: "#686B6E !important",
  },
  rightBlock: {
    borderRadius: "24px",
    maxHeight: "100vh",
  },
});
