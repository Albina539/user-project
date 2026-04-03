import { NavLink } from "react-router";

const NavBar = () => {
  return (
    <nav className="nav-panel">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/users">Users</NavLink>
      <NavLink to="/usergroup">Groups</NavLink>
    </nav>
  );
};

export default NavBar;
