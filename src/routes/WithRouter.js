import { useLocation, useNavigate, useParams } from "react-router-dom";

export function withRouter(Child) {
    return (props) => {
        const location = useLocation();
        const navigate = useNavigate();
        const { docid } = useParams();
        return <Child {...props} docid={docid} navigate={navigate} location={location} />;
    }
}