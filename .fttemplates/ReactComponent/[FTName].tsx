import { FC } from "react";
import { useStyles } from "./[FTName].styles";

interface Props {}

export const [FTName]: FC<Props> = () => {
  const styles = useStyles();

  return <div className={styles.root}></div>;
};
