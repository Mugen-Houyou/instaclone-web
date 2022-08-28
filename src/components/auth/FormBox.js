
import styled from "styled-components";
import { BaseBox } from "../shared/shared";


const Container = styled(BaseBox)`
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    padding:35px 40px 24px 40px;
    margin-bottom: 20px;
    form{
        margin-top: 15px;
        width:100%;
        display:flex;
        justify-content:center;
        align-items:center;
        flex-direction:column;
}
`;

function FormBox({children}){
    return <Container>
        {children}
    </Container>;
}

export default FormBox;