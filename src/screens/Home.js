import { useNavigate } from "react-router-dom";
import { logUserOut } from "../apollo";


function Home({ setIsLoggedIn }) {
    const nvgt = useNavigate();
    return (<div>
        <h1>Welcome Home!</h1>
        <button onClick={() => logUserOut(nvgt)} >Log Out</button>
    </div>);
}

export default Home;