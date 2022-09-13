import styled from "styled-components"

const SAvatar = styled.div`
  width: ${props => props.lg?"35px":"25px"};
  height: ${props => props.lg?"35px":"25px"};
  border-radius: 50%;
  background-color: #2c2c2c;
  overflow:hidden;

`;

const Img = styled.img`
  max-height:100%;
`;

const Avatar = ({url = "", lg=false}) => {
  console.log("URL: ",url)
  return <SAvatar lg={lg}>
    {url !== "" ? <Img src={url} alt="User's avatar" /> : null}
  </SAvatar>
}

export default Avatar;
