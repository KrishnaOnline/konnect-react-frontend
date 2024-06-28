import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";

const PrivateRoute = ({children}) => {
    const {token} = useSelector(state => state.auth);
    console.log(token);
    if(token) {
        return children;
    } else {
        return <Navigate to="/login"/>
    }
}

export default PrivateRoute;