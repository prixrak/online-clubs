import { Roles } from "@enums/Roles";
import { User } from "firebase/auth";

export interface IUser extends User {}
export interface IClubMember {
  id: string;
  role: Roles;
}
