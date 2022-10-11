import { gql, useQuery } from "@apollo/client";

import Avatar from "../components/Avatar";
import Photo from "../components/feed/Photo";
import PageTitle from "../components/PageTitle";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../fragments";

const FEED_QUERY = gql`
  query seeFeed {
    seeFeed {
      ...PhotoFragment
      user {
        username
        avatar
      }
      caption
      comments {
        ...CommentFragment
      }
      createdAt
      isMine
    }
  }
  ${PHOTO_FRAGMENT}
  ${COMMENT_FRAGMENT}
`;

function Home({ setIsLoggedIn }) {
  const {data} = useQuery(FEED_QUERY);
  //console.log(data);
  return <div> 
    <PageTitle title="Home" />
      {data?.seeFeed?.map(photo => 
        <Photo
          key={photo.id}
          {...photo}
        />
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
