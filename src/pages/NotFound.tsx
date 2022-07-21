import { Link } from "react-router-dom";

/**
 * Component for page not found case.
 */
export default function NotFound(){
    return <h2>Page not found. <Link to="/">Go Home</Link></h2>
}