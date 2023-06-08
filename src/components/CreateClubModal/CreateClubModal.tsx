import { FC, useState } from "react";
import { useStyles } from "./CreateClubModal.styles";
import { CustomModal } from "@components/CustomModal";
import { Button, Stack } from "@mui/material";
import { CustomTextField } from "@components/CustomTextField";
import ImageUploader from "@components/ImageUploader/ImageUploader";
import {
  useClubsCollectionRef,
  useCurrentUser,
  useUsersCollectionRef,
} from "@hooks/useClubsCollectionRef";
import {
  CollectionReference,
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { IClub, IClubFormValues } from "@interfaces/IClub";
import { ITopic } from "@interfaces/ITopic";
import { collections } from "@constants/collections";
import { IMyClub } from "@interfaces/IClub";
import { useStorage } from "reactfire";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { CustomAvatar } from "@components/CustomAvatar";
import { Field, FieldProps, Form, Formik } from "formik";

interface Props
  extends Pick<React.ComponentProps<typeof CustomModal>, "open" | "onClose"> {}

export const CreateClubModal: FC<Props> = ({ open, onClose }) => {
  const styles = useStyles();
  const { clubsCollectionRef } = useClubsCollectionRef();
  const { usersCollectionRef } = useUsersCollectionRef();
  const { currentUser } = useCurrentUser();
  const storage = useStorage();

  const createClub = async (payload: IClubFormValues) => {
    try {
      const { name, description, image } = payload;
      console.log(currentUser?.uid);
      const newClubRef = await addDoc<Omit<IClub, "id">>(clubsCollectionRef, {
        name: name,
        description: description,
        imgUrl: "",
        logo: "",
        banner: "",
        updatedAt: serverTimestamp(),
        createdAt: serverTimestamp(),
        createdBy: currentUser?.uid ?? null,
      });

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
              <Button type='submit'>Create</Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </CustomModal>
  );
};
