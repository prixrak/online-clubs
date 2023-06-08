import { FC, useState } from "react";
import { useStyles } from "./CustomAvatar.styles";
import { Avatar } from "@mui/material";

export const CustomAvatar: FC<React.ComponentProps<typeof Avatar>> = (
  props
) => {
  const { src, ...restProps } = props;
  const styles = useStyles();

  return (
    <Avatar
      sx={{
        width: 100,
        height: 100,
      }}
      {...restProps}
      src={src}
    />
  );
};
