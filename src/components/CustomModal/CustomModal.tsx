import { FC } from "react";
import { useStyles } from "./CustomModal.styles";
import { Box, Modal } from "@mui/material";
import classNames from "classnames";

export const CustomModal: FC<React.ComponentProps<typeof Modal>> = ({
  children,
  className,
  ...props
}) => {
  const styles = useStyles();

  return (
    <Modal className={styles.root} {...props}>
      <Box className={classNames(styles.body, className)}>{children}</Box>
    </Modal>
  );
};
