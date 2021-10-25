import stringify from 'json-stable-stringify';
import urlcat from 'urlcat';

const serverEndpoint = 'http://localhost:5000';

export const getUsername = async (data: unknown) => {
  const response = await fetch(urlcat(serverEndpoint, 'profile/user'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: stringify(data),
  });
  return response;
};

export const getDid = async (data: unknown) => {
  const response = await fetch(urlcat(serverEndpoint, 'profile/username'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: stringify(data),
  });
  return response;
};

/**
 * 
 * @param data  =>
 * {
    "did": user DID,
    "ceramicHash": Ceramic hash for the user,
    "userName": User name,
    "did_sign": {
    }
}
 * @returns 
 */

export const createUser = async (data: unknown) => {
  const response = await fetch(urlcat(serverEndpoint, 'profile/createUser'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: stringify(data),
  });
  return response;
};

/**
 * 
 * @param data  =>
 * {
    "did": user DID,
    "post_hash": Ceramic hash for the user,
    "did_sign": {
    }
}
 * @returns 
 */
export const createPost = async (data: unknown) => {
  const response = await fetch(urlcat(serverEndpoint, 'profile/createPost'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: stringify(data),
  });
  return response;
};
