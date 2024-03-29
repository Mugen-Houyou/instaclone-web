import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";
import { faHeart, faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { unstable_HistoryRouter, useParams } from "react-router-dom";
import styled from "styled-components";

import Button from "../components/auth/Button";
import PageTitle from "../components/PageTitle";
import { FatText } from "../components/shared/shared";
import { PHOTO_FRAGMENT } from "../fragments";
import useUser from "../hooks/useUser";

const FOLLOW_USER_MUTATION = gql`
  mutation followUser($username: String!) {
    followUser(username: $username) {
      ok
    }
  }
`;

const UNFOLLOW_USER_MUTATION = gql`
  mutation unfollowUser($username: String!) {
    unfollowUser(username: $username) {
      ok
    }
  }
`;

/*query seeProfile($username:String!){<== 이거는 프론트엔드를 위한 것
    seeProfile(username:$username){<== 이거는 백엔드에 보내는 것.
      .......
    }*/
const SEE_PROFILE_QUERY = gql`
  query seeProfile($username: String!) {
    seeProfile(username: $username) {
      firstName
      lastName
      username
      bio
      avatar
      photos {
        ...PhotoFragment
      }
      totalFollowing
      totalFollowers
      isMe
      isFollowing
    }
  }
  ${PHOTO_FRAGMENT}
`;

const Header = styled.div`
  display: flex;
`;
const Avatar = styled.img`
  margin-left: 50px;
  height: 160px;
  width: 160px;
  border-radius: 50%;
  margin-right: 150px;
  background-color: #2c2c2c;
`;
const Column = styled.div``;
const Username = styled.h3`
  font-size: 28px;
  font-weight: 400;
`;
const Row = styled.div`
  margin-bottom: 20px;
  font-size: 16px;
  display: flex;
  align-items: center;
`;
const List = styled.ul`
  display: flex;
`;
const Item = styled.li`
  margin-right: 20px;
`;
const Value = styled(FatText)`
  font-size: 18px;
`;
const Name = styled(FatText)`
  font-size: 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-auto-rows: 290px;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-top: 50px;
`;

const Photo = styled.div`
  background-image: url(${(props) => props.bg});
  background-size: cover;
  position: relative;
`;

const Icons = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  opacity: 0;
  &:hover {
    opacity: 1;
  }
`;

const Icon = styled.span`
  font-size: 18px;
  display: flex;
  align-items: center;
  margin: 0px 5px;
  svg {
    font-size: 14px;
    margin-right: 5px;
  }
`;

const ProfileBtn = styled(Button).attrs({
  as: "span",
})`
  margin-left: 10px;
  margin-top: 0px;
  cursor:pointer;
`;


function Profile() {
  const { username } = useParams(); // 이 useParams()는 URL의 파라메타가 담긴 객체를 리턴.

  const {data:userData} = useUser();

  const aclient = useApolloClient();
  
  const { data, loading } = useQuery(SEE_PROFILE_QUERY, {
    variables: {username,},
  });

  const followUserCompleted = (data) => {  
    const {followUser:{ok}} = data;
    if (!ok) return;
    const {cache} = aclient;
    cache.modify({
      id:`User:${username}`,
      fields: {
        isFollowing(prev){ // 함수 이름은 query에서 가져옴.
          return true;
        },
        totalFollowers(prev){
          return prev+1;
        }
      }
    });
    const { me } = userData;// 내 userdata에서도 하나 더해줘야 함.
    cache.modify({
      id: `User:${me.username}`,
      fields: {
        totalFollowing(prev) {
          return prev + 1;
        },
      },
    });
  }
  const unfollowUserUpdate = (cache, result ) => {
    const {data:{unfollowUser:{ok}}} = result;
    if (!ok) return;
    cache.modify({
      id:`User:${username}`,
      fields: {
        isFollowing(prev){ // 함수 이름은 query에서 가져옴.
          return false;
        },
        totalFollowers(prev){
          return prev-1;
        }
      }
    });
    const { me } = userData; // 내 userdata에서도 하나 빼줘야 함.
    cache.modify({
      id: `User:${me.username}`,
      fields: {
        totalFollowing(prev) {
          return prev-1;
        },
      },
    });
  }


  const [followUser] = useMutation(FOLLOW_USER_MUTATION, {
    variables:{username,},
    onCompleted:followUserCompleted,
  });
  const [unfollowUser] = useMutation(UNFOLLOW_USER_MUTATION, {
    variables:{username,},
    update:unfollowUserUpdate,
  });
  
  const getButton = (seeProfile) => {
    const { isMe, isFollowing } = seeProfile;
    if (isMe) {
      return <ProfileBtn>Edit Profile</ProfileBtn>;
    }
    if (isFollowing) {
      return <ProfileBtn onClick={unfollowUser} >Unfollow</ProfileBtn>;
    } else {
      return <ProfileBtn onClick={followUser} >Follow</ProfileBtn>;
    }
  };

  return <div>
    <PageTitle
      title={
        loading ? "Loading..." : `${data?.seeProfile?.username}'s Profile`
      }
    />
    <Header>
      <Avatar src={data?.seeProfile?.avatar} />
      <Column>
        <Row>
          <Username>{data?.seeProfile?.username}</Username>
          {data?.seeProfile ? getButton(data.seeProfile) : null} 
        </Row>
        <Row>
          <List>
            <Item>
              <span>
                <Value>{data?.seeProfile?.totalFollowers}</Value> followers
              </span>
            </Item>
            <Item>
              <span>
                <Value>{data?.seeProfile?.totalFollowing}</Value> following
              </span>
            </Item>
          </List>
        </Row>
        <Row>
          <Name>
            {data?.seeProfile?.firstName}
            {"  "}
            {data?.seeProfile?.lastName}
          </Name>
        </Row>
        <Row>{data?.seeProfile?.bio}</Row>
      </Column>
    </Header>
    <Grid>
      {data?.seeProfile?.photos.map((photo) => (
        <Photo key={photo.id} bg={photo.file}>
          <Icons>
            <Icon>
              <FontAwesomeIcon icon={faHeart} />
              {photo.likes}
            </Icon>
            <Icon>
              <FontAwesomeIcon icon={faComment} />
              {photo.commentNumber}
            </Icon>
          </Icons>
        </Photo>
      ))}
    </Grid>
  </div>;
}

export default Profile;