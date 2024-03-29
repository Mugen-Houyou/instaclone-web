import styled from "styled-components";

const SSeperator = styled.div`
    margin:20px 0px 20px 0px;
    text-transform: uppercase;
    display:flex;
    justify-content:center;
    align-items:center;  
    width:100%;     
    div{
        width:100%;
        height:1px;
        background-color: ${(props) => props.theme.borderColor};
        
    }
    span{
        margin: 0px 10px;
        font-weight:600;
        font-size:12px;
        color: #8e8e8e;
    }
`;

const Seperator = () => (
    <SSeperator>
        <div />
        <span>OR</span>
        <div />
    </SSeperator>
);

export default Seperator;