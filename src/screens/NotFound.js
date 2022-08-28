import routes from '../routes';

const NotFound = () => {
    return (<h1>
        404 Not Found
        {routes.home}
        {routes.signUp}
    </h1>);
};
export default NotFound;