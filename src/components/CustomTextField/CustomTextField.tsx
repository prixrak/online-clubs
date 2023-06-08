import { FC } from "react";
import { useStyles } from "./CustomTextField.styles";
import { TextField } from "@mui/material";
import classNames from "classnames";

export const CustomTextField: FC<React.ComponentProps<typeof TextField>> = ({
  className,
  ...props
}) => {
  const styles = useStyles();

  return (
    <TextField className={classNames(styles.textField, className)} {...props} />
  );
};
