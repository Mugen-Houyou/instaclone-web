import { gql, useQuery } from "@apollo/client";

import Avatar from "../components/Avatar";
import Photo from "../components/feed/Photo";

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
