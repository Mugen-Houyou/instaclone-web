import { gql, useQuery } from "@apollo/client";
import { faBookmark, faComment, faHeart, faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import {faHeart as SolidHeart} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

import { logUserOut } from "../apollo";
import Avatar from "../components/Avatar";
import Photo from "../components/feed/Photo";
import { FatText } from "../components/shared/shared";

const FEED_QUERY = gql`
  query seeFeed {
    seeFeed {
      id
      user {
        username
        avatar
      }
      file
      caption
      likes
      comments
      createdAt
      isMine
      isLiked
    }
  }
`;

function Home({ setIsLoggedIn }) {
  const {data} = useQuery(FEED_QUERY);
  console.log(data);
  return <div>
  {data?.seeFeed?.map(photo => 
    <Photo></Photo>
  )}
  </div>;
  
  //const nvgt = useNavigate();
  // return <div>
  //   <div>
  //     <h1>Welcome Home!</h1>
  //     <button onClick={() => logUserOut(nvgt)}>Log Out</button>
  //   </div>
  // </div>;
}

export default Home;
