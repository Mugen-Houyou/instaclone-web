
import PropTypes from "prop-types";

import { faBookmark, faComment, faHeart, faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import {faHeart as SolidHeart} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

import { logUserOut } from "../apollo";
import Avatar from "../Avatar";
import { FatText } from "../shared/shared";


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
`;

const Likes = styled(FatText)`
  margin-top: 15px;
  display: block;
`;

const Username = styled(FatText)`
  margin-left: 15px;
`;



const Photo = () => 
    <PhotoContainer key={photo.id}>
      <PhotoHeader>
        <Avatar url={photo.user.avatar}></Avatar>
        <Username>{photo.user.username}</Username>  
      </PhotoHeader>
      <PhotoFile  src={photo.file} ></PhotoFile>
      <PhotoData>
        <PhotoActions>
          <div>
            <PhotoAction>
              <FontAwesomeIcon style={{color:photo.isLiked?"tomato":"inherit"}} size={"2x"} icon={photo.isLiked? SolidHeart : faHeart} />
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
        <Likes>{photo.likes===1?"1 Like": `${photo.likes} Likes`}</Likes>
      </PhotoData>
    </PhotoContainer>;

Photo.propTypes = {
  id, user, file, isLiked, likes
}

export default Photo;