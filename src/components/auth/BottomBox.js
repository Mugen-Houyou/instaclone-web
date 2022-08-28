
import {Link} from "react-router-dom";
import styled from "styled-components";
import { BaseBox } from "../shared/shared";


const SBottomBox = styled(BaseBox)`
    text-align:center;
    padding: 20px 0px;
    a{
        margin-left:5px;    
        font-weight: 600;
        color:  ${(props) => props.theme.accent};
    }
`;


function BottomBox({call_to_action, link, linkText}){
    return  <SBottomBox>
        <span>{call_to_action} </span>
        <Link to={link}>{linkText}</Link>
    </SBottomBox>
    ;
}

// BottomBox.propTypes = {
//     call_to_action:PropTypes.string.isRequired,
//     link:PropTypes.string.isRequired,
//     linkText:PropTypes.string.isRequired,
// }

export default BottomBox;