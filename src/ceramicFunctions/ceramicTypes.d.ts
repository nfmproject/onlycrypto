export interface profileType {
  username: string;
  firstName: string;
  lastName: string;
  description: string;
  gender: string;
  residenceCountry: string;
}

export interface postType {
  posterId: string;
  username: string;
  postText: string;
  encryptedText?: string;
  iv?: string;
  locks?: Array<string>;
}
