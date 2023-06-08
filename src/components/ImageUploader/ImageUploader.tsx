import React, { FC, useState } from "react";
import { ReactComponent as ImgUlploadIcon } from "@assets/ulpload.svg";
import { Avatar, Stack, Typography } from "@mui/material";
import { useStyles } from "./ImageUploader.styles";

interface Props {
  setImage: (image: File | null) => void;
}
const ImageUploader: FC<Props> = ({ setImage }) => {
  const styles = useStyles();
  const [displayImg, setDisplayImg] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        setDisplayImg(result);
      };
    }
  };

  return (
    <Stack justifyContent='center' alignItems='center'>
      <input
        accept='image/*'
        type='file'
        onChange={handleImageChange}
        style={{ display: "none" }}
        id='image-upload'
      />
      <label htmlFor='image-upload' className={styles.uploadBlock}>
        {displayImg ? (
          <Avatar sx={{ width: 80, height: 80 }} src={displayImg} />
        ) : (
          <ImgUlploadIcon />
        )}
      </label>
      {!displayImg && <Typography variant='body1'>Upload image</Typography>}
    </Stack>
  );
};

export default ImageUploader;
