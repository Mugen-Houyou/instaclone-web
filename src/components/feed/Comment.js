import styled from "styled-components";
import PropTypes from "prop-types";
import sanitizeHtml from "sanitize-html";
import { parseValue } from "graphql";
import { Link } from "react-router-dom";
import React from "react";
import { gql, useMutation } from "@apollo/client";

import { FatText } from "../shared/shared";

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($id:Int!){
    deleteComment(id:$id){
      ok
    }
  }
`;

const CommentContainer = styled.div`
  margin-bottom: 7px;
`;

const CommentCaption = styled.span`
  margin-left: 10px;
  mark{
    background-color: inherit;
    color: ${(props) => props.theme.accent };
    cursor:pointer;
    text-decoration: underline;
  }
`;


const Comment = ({
  id,
  author,
  photoId,
  payload,
  isMine}) =>{
  // const sanitizedPayload = sanitizeHtml(payload.replace(/#[\w]+/g, "<mark>$&</mark>"),{
  //   allowedTags:["mark"]
  // });
  const updateDeleteComment = (cache, result) => {
    const {data:{deleteComment:{ok, error}}} = result;
    if (ok) {
      cache.evict({id:`Comment:${id}`});
      cache.modify({
        id:`Photo:${photoId}`,
        fields:{
          commentNumber(prevLikes){
            return prevLikes-1;
          }
        }
      })
    }
  }

  const [deleteCommentMutation] = useMutation(DELETE_COMMENT_MUTATION,{
    variables:{
      id,
    },
    update: updateDeleteComment
  });

  const onDeleteClick = () =>{
    deleteCommentMutation();
  }

  return <CommentContainer>
    <Link to={`/users/${author}`}>
      <FatText>{author}</FatText>
    </Link>
    {/* <CommentCaption dangerouslySetInnerHTML={{
      __html:sanitizedPayload
    }}   /> */}
    <CommentCaption>{payload.split(" ").map((word,index,array) => 
    <React.Fragment key={index}>
      {/#[\w]+/.test(word) ? 
        <Link to={`/hashtags/${word}`}>{word}</Link>
      : word }
        
      {index !== array.length && ' '}

    </React.Fragment>
    )}</CommentCaption>    
    {isMine?<button onClick={onDeleteClick}>❌</button>:null}
  </CommentContainer>
    
}

Comment.propTypes = {
  isMine: PropTypes.bool,
  id: PropTypes.number,
  photoId: PropTypes.number,
  author: PropTypes.string.isRequired,
  payload: PropTypes.string.isRequired,
};
export default Comment;