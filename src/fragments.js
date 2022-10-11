import { gql } from "@apollo/client";

// 여기서 Asdfsdfa는 아무렇게나 해도 됨. Photo는 백엔드에 사용했던 이름과 동일해야 함.

export const PHOTO_FRAGMENT = gql`
  fragment PhotoFragment on Photo {
    id
    file
    likes
    commentNumber
    isLiked
  }
`;

export const COMMENT_FRAGMENT = gql`
  fragment CommentFragment on Comment {
    id
    user {
      username
      avatar
    }
    payload
    isMine
    createdAt
  }
`;