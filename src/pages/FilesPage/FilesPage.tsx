import { FC } from "react";
import { useStyles } from "./FilesPage.styles";

interface Props {}

export const FilesPage: FC<Props> = () => {
  const styles = useStyles();

  return <div className={styles.root}></div>;
};
