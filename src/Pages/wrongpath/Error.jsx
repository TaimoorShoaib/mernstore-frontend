import style from './Error.module.css'
import { Link } from "react-router-dom";
export default function Error() {
  return (
    <div className={style.container}>
      <h1>Error 404: Page Not Found</h1>
      <p>We apologize, but the page you are looking for could not be found.</p>
      <p>Please check the URL and try again.OR,<Link to='/' > Go back to Home</Link></p>
    </div>
  );
}
