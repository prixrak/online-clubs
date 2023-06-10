import { FC } from "react";
import { useStyles } from "./CreateTopicModal.styles";
import { CustomModal } from "@components/CustomModal";
import { Button, Stack } from "@mui/material";
import { CustomTextField } from "@components/CustomTextField";
import ImageUploader from "@components/ImageUploader/ImageUploader";
import { addDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { ITopic, ITopicFormValues } from "@interfaces/ITopic";
import { useStorage } from "reactfire";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Field, FieldProps, Form, Formik } from "formik";
import {
  useCurrentUser,
  useTopicsCollectionRef,
} from "@hooks/useClubsCollectionRef";

interface Props
  extends Pick<React.ComponentProps<typeof CustomModal>, "open" | "onClose"> {
  clubId: string;
}

export const CreateTopicModal: FC<Props> = ({ clubId, ...props }) => {
  const styles = useStyles();
  const { topicsCollectionRef } = useTopicsCollectionRef({ clubId });
  const { currentUser } = useCurrentUser();
  const storage = useStorage();

  const createTopic = async (payload: ITopicFormValues) => {
    try {
      const { name, description, image } = payload;
      const newTopicRef = await addDoc<Omit<ITopic, "id">>(
        topicsCollectionRef,
        {
          name: name,
          description: description,
          imgUrl: "",
          updatedAt: serverTimestamp(),
          createdAt: serverTimestamp(),
          createdBy: currentUser?.uid ?? null,
        }
      );

      if (!image) return;

      const topicId = newTopicRef.id;

      // Завантажте зображення в Firebase Storage
      const storageRef = ref(
        storage,
        `clubs/${clubId}/topics/${topicId}/avatars/${topicId}`
      );
      await uploadBytesResumable(storageRef, image);

      // Отримайте URL завантаженого зображення
      const downloadURL = await getDownloadURL(storageRef);

      // Збережіть URL в Firestore
      updateDoc(newTopicRef, {
        imgUrl: downloadURL,
      });
    } catch (error) {
      console.error("Error uploading image: ", error);
    }
  };

  return (
    <CustomModal {...props}>
      <Formik
        initialValues={{ name: "", description: "", image: null }}
        onSubmit={(values) => {
          createTopic(values);
        }}>
        {({ setFieldValue }) => (
          <Form>
            <Stack rowGap='20px'>
              <Field name='name'>
                {({ field }: FieldProps) => (
                  <CustomTextField
                    {...field}
                    placeholder='Topic name...'
                    fullWidth></CustomTextField>
                )}
              </Field>
              <Field name='description'>
                {({ field }: FieldProps) => (
                  <CustomTextField
                    {...field}
                    placeholder='Topic description...'
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
