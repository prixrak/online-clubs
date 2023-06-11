import { FC } from "react";
import { useStyles } from "./DetailClubModal.styles";
import { CustomModal } from "@components/CustomModal";
import { IClub } from "@interfaces/IClub";
import { Stack } from "@mui/material";
import { IClubMember } from "@interfaces/IUser";

interface Props
  extends Omit<React.ComponentProps<typeof CustomModal>, "children"> {
  club: IClub;
  members: IClubMember[];
}
export const DetailClubModal: FC<Props> = ({ club, members, ...props }) => {
  const styles = useStyles();

  return (
    <CustomModal {...props}>
      <Stack gap='12px'>
        <Stack
          sx={{
            color: "#FFFFFF",
            fontSize: 26,
            fontWeight: 700,
          }}>
          {club.name}
        </Stack>
        <Stack
          sx={{
            color: "#B6F09C",
            fontSize: 16,
            fontWeight: 500,
          }}>{`${members.length} member${
          members.length > 1 ? "s" : ""
        }`}</Stack>
        <Stack
          sx={{
            color: "#9B9C9E",
            fontSize: 16,
            fontWeight: 500,
          }}>
          {club.description}
        </Stack>
        <Stack
          sx={{
            color: "#9B9C9E",
            fontSize: 16,
            fontWeight: 500,
          }}>
          Categories: {club.categories.join(", ")}
        </Stack>
      </Stack>
    </CustomModal>
  );
};
