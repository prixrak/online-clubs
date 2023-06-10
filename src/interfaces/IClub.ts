import { ClubCategory } from "@enums/ClubCategory";
import { ClubType } from "@enums/ClubTypes";
import { Timestamp } from "firebase/firestore";

export interface IClub {
  id: string;
  name: string;
  nameLowercase: string;
  description: string;
  logo: string;
  type: ClubType;
  categories: ClubCategory[];
  banner: string;
  createdAt: Timestamp | null;
  updatedAt: Timestamp | null;
  imgUrl: string;
  createdBy: string | null;
}

export interface IMyClub {
  id: string;
}

export interface IClubFormValues {
  name: string;
  description: string;
  image: File | null;
}

export interface IMyClub {
  id: string;
}
