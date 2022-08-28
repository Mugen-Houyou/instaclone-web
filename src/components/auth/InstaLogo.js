import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faInstagram } from "@fortawesome/free-brands-svg-icons";

const LogoContainer = styled.div`
    margin: 12px;
`;

function InstaLogo(){ 
    return <LogoContainer>
        <FontAwesomeIcon icon={faInstagram} size="4x" ></FontAwesomeIcon>
    </LogoContainer>
}

export default InstaLogo;