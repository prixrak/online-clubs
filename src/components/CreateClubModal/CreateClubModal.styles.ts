import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  root: {},
  autocomplete: {
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#fff",
    },
    "& .MuiInputBase-input": {
      color: "#fff",
    },
    "& .MuiAutocomplete-listbox": {
      backgroundColor: "#fff",
    },
    "& .MuiAutocomplete-option": {
      color: "#000",
    },
    "& .MuiChip-root": {
      background: "white",
      color: "black",
    },
    "& .MuiInputBase-root": {
      color: "#fff",

      "&:before": {
        borderBottom: "1px solid rgba(255, 255, 255, 0.42)",
      },
    },
    "& .MuiAutocomplete-popupIndicator": {
      color: "rgba(255, 255, 255, 0.42)",
    },
    "& .MuiAutocomplete-clearIndicator": {
      color: "white",
    },
  },
});
