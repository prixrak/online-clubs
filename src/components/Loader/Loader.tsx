import { FC } from "react";
import { useStyles } from "./Loader.styles";

interface Props {}

export const Loader: FC<Props> = () => {
  const styles = useStyles();

  return (
    <div className='position-fixed w-100 top-0 start-0 zindex-9999'>
      <div style={{ width: "{dynamic}-%", height: "3px", background: "red" }} />
    </div>
  );
};
