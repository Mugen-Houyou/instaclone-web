import { logUserOut } from "../apollo";


function Home({ setIsLoggedIn }) {
    return (<div>
        <h1>Welcome Home!</h1>
        <button onClick={() => logUserOut()} >Log Out</button>
    </div>);
}

export default Home;