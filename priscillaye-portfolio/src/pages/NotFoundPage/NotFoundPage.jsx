import "./NotFoundPage.scss";
import { Link } from "react-router";

const NotFound = () => {
    return (
        <div className="not-found-page">
            <h1>404 - Page Not Found</h1>
            <p>Sorry, the page you are looking for does not exist.... try another page???? (p.s. there is a super secret hidden page but you can only access it via typing it on the url... ;)</p>
            <Link to="/">Return to Home</Link>
        </div>
    );
};

export default NotFound;