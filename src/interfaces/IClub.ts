export interface IClub {
  id: number;
  name: string;
  description: string;
  logo: string;
  banner: string;
  createdAt: Date;
  updatedAt: Date;
  imgUrl: string;
  createdBy: string | null;
}

export interface IClubFormValues {
  name: string;
  description: string;
  image: File | null;
}

export interface IMyClub {
  id: string;
}
