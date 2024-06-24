import { Link } from "react-router-dom";
import "@/ui/components/not-found/NotFound.scss";

export default function NotFound() {
  return (
    <div className="notFound">
      <h1>404 - Pin Not Found</h1>
      <p>The pin you are looking for does not exist.</p>
      <Link to="/">Go back to Home</Link>
    </div>
  );
}
