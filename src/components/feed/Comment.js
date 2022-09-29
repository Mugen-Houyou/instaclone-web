import styled from "styled-components";
import PropTypes from "prop-types";
import sanitizeHtml from "sanitize-html";
import { parseValue } from "graphql";
import { Link } from "react-router-dom";
import React from "react";

import { FatText } from "../shared/shared";

const CommentContainer = styled.div`

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


const Comment = ({author, payload}) =>{
  // const sanitizedPayload = sanitizeHtml(payload.replace(/#[\w]+/g, "<mark>$&</mark>"),{
  //   allowedTags:["mark"]
  // });
  return <CommentContainer>
    <FatText>{author}</FatText>
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
  </CommentContainer>
    
}

Comment.propTypes = {
  author: PropTypes.string.isRequired,
  payload: PropTypes.string.isRequired,
};
export default Comment;