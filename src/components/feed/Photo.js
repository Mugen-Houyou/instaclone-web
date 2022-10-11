
import PropTypes from "prop-types";

import { faBookmark, faComment, faHeart, faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import {faHeart as SolidHeart} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { gql, useMutation } from "@apollo/client";

import { logUserOut } from "../../apollo";
import Avatar from "../Avatar";
import { FatText } from "../shared/shared";
import Comments from "./Comments";
import { Link } from "react-router-dom";

const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleLike($id:Int!){
    toggleLike(id:$id){
      ok
      error
    }
  }
`;

const PhotoContainer = styled.div`
  background-color: white;
  border: 1px solid ${(props) => props.theme.borderColor};
  margin-bottom: 20px;
  max-width: 615px;
`;

const PhotoHeader = styled.div`
  padding: 15px;
  display: flex;
  align-items: center;
`;
const PhotoFile = styled.img`
  width: 100%;
  max-height:500px;
`;

const PhotoData = styled.div`
  padding: 15px;
`;

const PhotoActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  div {
    display: flex;
    align-items: center;
  }
  svg{
    font-size:18px;
  }
`;

const PhotoAction = styled.div`
  margin-right: 10px;
  cursor:pointer;
`;

const Likes = styled(FatText)`
  margin-top: 15px;
  display: block;
`;

const Username = styled(FatText)`
  margin-left: 15px;
`;
const Photo = ({ 
  id,
  user,
  file,
  isLiked,
  likes,
  caption,
  commentNumber,
  comments, }) => {

  const updateToggleLike = (cache, result) => {
    const {
      data: {
        toggleLike: { ok },
      },
    } = result;


    if (ok) { // r/w fragment보다 훨씬 쉬움
      const photoId = `Photo:${id}`;
      cache.modify({
        id: photoId,
        fields: {
          isLiked(prevVal){
            return !prevVal;
          },
          likes(prevVal){
            if(isLiked) return prevVal-1;
            else return prevVal-1;
          }
        }
      });
    }

    
    // if (ok ) {// 함수 Photo의 파라메타가 ({ id, user, file })일 경우. 즉 Photo가 isLiked, likes가 없을 경우.
    //   const fragmentId = `Photo:${id}`;
    //   const fragment =  gql`
    //     fragment Asdfasdfname on Photo{
    //       isLiked
    //       likes
    //     }
    //   `;
    //   const result = cache.readFragment({ 
    //     id:fragmentId,
    //     fragment: fragment,
    //   });

    //   if ("isLiked" in result && "likes" in result) {
    //     const { isLiked: cacheIsLiked, likes: cacheLikes } = result;
    //     cache.writeFragment({
    //       id: fragmentId,
    //       fragment,
    //       data: {
    //         isLiked: !cacheIsLiked,
    //         likes: cacheIsLiked ? cacheLikes - 1 : cacheLikes + 1,
    //       },
    //     });
    //   }
    //}
  };
    /* if (ok ) cache.writeFragment({함수 Photo의 파라메타가 ({ id, user, file, isLiked, likes})일 경우. 
      // 즉 Photo에 isLiked, likes 있을 경우.
      id:`Photo:${id}`,
      fragment:gql`
        fragment Asdfasdfname on Photo{
          isLiked
          likes
        }
      `;
      data:{
        isLiked: !isLiked,
        likes: isLiked ? likes-1 : likes+1,
      } 
    });
  } */

  const [toggleLikeMutation , {loading}] = useMutation(TOGGLE_LIKE_MUTATION, {
    variables:{
      id
    },
    // refetchQueries: []  query를 refetch한다, 즉 mutation을 실행하고 백엔드의 response에 error 없다면 한번 더 call한다.
    update: updateToggleLike // update는 백엔드에서 data 받아오고 그걸 cache에 직접 연결시켜줌.
  });

  return <PhotoContainer key={id}>
    <PhotoHeader> 
      <Link to={`/users/${user.username}`}>
        <Avatar url={user.avatar}></Avatar>
      </Link>
      <Link to={`/users/${user.username}`}>
        <Username>{user.username}</Username>
      </Link>
    </PhotoHeader>
    <PhotoFile src={file}></PhotoFile>
    <PhotoData>
      <PhotoActions>
        <div>
          <PhotoAction onClick={toggleLikeMutation} >
            <FontAwesomeIcon
              style={{ color: isLiked ? "tomato" : "inherit" }}
              size={"2x"}
              icon={isLiked ? SolidHeart : faHeart}
            />
          </PhotoAction>
          <PhotoAction>
            <FontAwesomeIcon size={"2x"} icon={faComment} />
          </PhotoAction>
          <PhotoAction>
            <FontAwesomeIcon size={"2x"} icon={faPaperPlane} />
          </PhotoAction>
        </div>
        <div>
          <FontAwesomeIcon size={"2x"} icon={faBookmark} />
        </div>
      </PhotoActions>
      <Likes>{likes === 1 ? "1 Like" : `${likes} Likes`}</Likes>
      <Comments
        photoId={id}
        author={user.username}
        caption={caption}
        commentNumber={commentNumber}
        comments={comments}
      />
    </PhotoData>
  </PhotoContainer>;
}

Photo.propTypes = {
  id: PropTypes.number.isRequired,
  user: PropTypes.shape({
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired,
  }),
  caption:PropTypes.string,
  file: PropTypes.string.isRequired,
  isLiked: PropTypes.bool.isRequired,
  likes: PropTypes.number.isRequired,
  commentNumber: PropTypes.number.isRequired
};

export default Photo;