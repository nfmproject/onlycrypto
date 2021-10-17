import { CeramicType } from '../ceramic';
import { postType, profileType } from './ceramicTypes';

/**
 * create user profile on ceramic protocol
 * return @bool status
 */

export const profileCreate = (ceramic: CeramicType, profileData: profileType) => {
  ceramic
    .createData(profileData)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.error(error);
      return;
    });
};

export const profileUpdate = (ceramic: CeramicType, streamID: string, profileData: profileType) => {
  ceramic
    .updateData(streamID, profileData)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.error(error);
      return;
    });
};

export const postCreate = (ceramic: CeramicType, postData: postType) => {
  ceramic
    .createData(postData)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.error(error);
      return;
    });
};
