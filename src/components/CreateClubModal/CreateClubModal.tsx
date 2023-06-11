import { FC, useEffect, useState } from "react";
import { useStyles } from "./CreateClubModal.styles";
import { CustomModal } from "@components/CustomModal";
import {
  Autocomplete,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from "@mui/material";
import { CustomTextField } from "@components/CustomTextField";
import ImageUploader from "@components/ImageUploader/ImageUploader";
import {
  useClubsCollectionRef,
  useCurrentUser,
} from "@hooks/useClubsCollectionRef";
import { addDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { IClub, IClubFormValues } from "@interfaces/IClub";
import { useStorage } from "reactfire";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Field, FieldProps, Form, Formik } from "formik";
import { ClubType } from "@enums/ClubTypes";
import { ClubCategory } from "@enums/ClubCategory";

interface Props
  extends Pick<React.ComponentProps<typeof CustomModal>, "open" | "onClose"> {}

export const CreateClubModal: FC<Props> = ({ open, onClose }) => {
  const styles = useStyles();
  const { clubsCollectionRef } = useClubsCollectionRef();
  const { currentUser } = useCurrentUser();
  const storage = useStorage();

  const createClub = async (payload: IClubFormValues) => {
    try {
      const { name, description, image } = payload;
      const newClubRef = await addDoc<Omit<IClub, "id">>(clubsCollectionRef, {
        name: name,
        nameLowercase: name.toLowerCase(),
        description: description,
        imgUrl: "",
        logo: "",
        banner: "",
        type: clubType,
        categories: selectedCategories?.map((category) => category.value) ?? [],
        updatedAt: serverTimestamp(),
        createdAt: serverTimestamp(),
        createdBy: currentUser?.uid ?? null,
      });
      setSelectedCategories([]);

      if (!image) return;

      const clubId = newClubRef.id;

      // Завантажте зображення в Firebase Storage
      const storageRef = ref(storage, `clubs/${clubId}/avatars/${clubId}`);
      await uploadBytesResumable(storageRef, image);

      // Отримайте URL завантаженого зображення
      const downloadURL = await getDownloadURL(storageRef);

      // Збережіть URL в Firestore
      updateDoc(newClubRef, {
        imgUrl: downloadURL,
      });
    } catch (error) {
      console.error("Error uploading image: ", error);
    }
  };

  interface IClubCategoryOption {
    value: ClubCategory;
    title: string;
  }
  const [clubType, setClubType] = useState(ClubType.Public);
  const [selectedCategories, setSelectedCategories] =
    useState<IClubCategoryOption[]>();

  const handleAutocompleteChange = (
    _: React.ChangeEvent<{}>,
    value: IClubCategoryOption[]
  ) => {
    setSelectedCategories(value);
  };

  return (
    <CustomModal open={open} onClose={onClose}>
      <Formik
        initialValues={{ name: "", description: "", image: null }}
        onSubmit={(values) => {
          createClub(values);
        }}>
        {({ setFieldValue }) => (
          <Form>
            <Stack rowGap='20px'>
              <Field name='name'>
                {({ field }: FieldProps) => (
                  <CustomTextField
                    {...field}
                    placeholder='Club name...'
                    fullWidth></CustomTextField>
                )}
              </Field>
              <Field name='description'>
                {({ field }: FieldProps) => (
                  <CustomTextField
                    {...field}
                    placeholder='Club description...'
                    fullWidth></CustomTextField>
                )}
              </Field>
              <ImageUploader
                setImage={(image) => setFieldValue("image", image)}
              />
              <FormControl>
                <FormLabel
                  sx={{
                    color: "#FFFFFF",
                  }}>
                  Club type
                </FormLabel>
                <RadioGroup
                  row
                  value={clubType}
                  onChange={(e) =>
                    setClubType(e.currentTarget.value as ClubType)
                  }>
                  {Object.entries(ClubType).map(([, value]) => (
                    <FormControlLabel
                      value={value}
                      control={<Radio />}
                      label={value.charAt(0).toUpperCase() + value.slice(1)}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
              <Autocomplete
                multiple
                id='tags-standard'
                options={Object.entries(ClubCategory).map(([key, value]) => ({
                  title: key,
                  value: value,
                }))}
                value={selectedCategories}
                onChange={handleAutocompleteChange}
                getOptionLabel={(option) => option.title}
                defaultValue={[]}
                classes={{ root: styles.autocomplete }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant='standard'
                    placeholder='Categories'
                  />
                )}
              />

              <Button type='submit'>Create</Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </CustomModal>
  );
};
