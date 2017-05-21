import React, { PropTypes } from 'react';
import { Link } from 'react-router';


const Navbar = ({ username, logout, accessClass, getDocuments, getProfile }) =>
  <header className={`navbar-fixed ${accessClass}`}>
    <nav>
      <div className="nav-wrapper container">
        <Link to="/" className="brand-logo hide-on-med-and-down">DMS</Link>

        <ul className="right">
          <li><Link to="">About</Link></li>
          <span className="notLoggedIn">
            <li><Link to="login">Login</Link></li>
            <li><Link to="signup">SignUp</Link></li>
          </span>
          <span className="forAdmin">
            <li><Link to="">Users</Link></li>
            <li><Link to="role">Roles</Link></li>
          </span>
          <span className="loggedIn">
            <li><Link className="dropdown-button" to="" data-activates="documents-dropdown">
              Documents<i className="material-icons right">arrow_drop_down</i>
            </Link></li>
            <li><Link className="dropdown-button" to="" data-activates="profile-dropdown">
              {username}<i className="material-icons left">person_pin</i>
            </Link></li>
          </span>
        </ul>
      </div>
    </nav>

    <div>
      <ul id="profile-dropdown" className="dropdown-content">
        <li><Link to="" onClick={getProfile} ><i className="fa fa-user" />Profile</Link></li>
        <li className="divider" />
        <li><Link to="" onClick={logout} ><i className="fa fa-sign-out" />Logout</Link></li>
      </ul>

      <ul id="documents-dropdown" className="dropdown-content">
        <li><Link to="document/new"><i className="fa fa-plus-circle" />New Document</Link></li>
        <li className="divider" />
        <li><Link to="" onClick={getDocuments} >
          <i className="fa fa-folder-open" />View Documents
        </Link></li>
        <li><Link to=""><i className="fa fa-book" />My Documents</Link></li>
        <li><Link to=""><i className="fa fa-users" />Role Documents</Link></li>
      </ul>
    </div>
  </header>;

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  getProfile: PropTypes.func.isRequired,
  getDocuments: PropTypes.func.isRequired,
  username: PropTypes.string,
  accessClass: PropTypes.string.isRequired
};

export default Navbar;