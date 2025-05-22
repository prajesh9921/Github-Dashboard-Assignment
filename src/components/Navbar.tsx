import { Link } from 'react-router-dom';
import './Navbar.scss';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__container">
        <Link to="/" className="navbar__brand">
          GitHub Dashboard
        </Link>
        <div className="navbar__links">
          <Link to="/" className="navbar__link">
            Search Repositories
          </Link>
          <Link to="/user" className="navbar__link">
            User Profiles
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
