import { Post } from "@prisma/client";

export enum ACTION_TYPE {}

interface ACTIONS {
  type: ACTION_TYPE;
  payload: Post;
}

export const postReducer: (state: Post, action: ACTIONS) => Post = (
  state: Post,
  action: ACTIONS
) => {
  return state;
};
