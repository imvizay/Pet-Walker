
import { Link } from "react-router-dom";
function Sidebar(){
  return (
    <aside className="sidebar">
    <div>
      <h2 className="logoText">PetWalker</h2>
      <p>Provider Portol</p>
    </div>

      <nav className="navLinks">
        <Link className="link">Dashboard</Link>
        <Link className="link">Search Jobs</Link>

        <Link className="link">Bookings</Link>
        <Link className="link">Messages</Link>
      </nav>

      <button className="newServiceBtn">
        + New Service
      </button>
    </aside>
  );
}
export default Sidebar;
