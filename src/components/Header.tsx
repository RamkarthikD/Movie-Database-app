import { useNavigate, useLocation, Link } from "react-router-dom";


export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname === "/login" || location.pathname === "/signup") return null;


  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-md fixed-top bg-primary">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">MovieHunt</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
            <li className="nav-item"><Link to="/movies/top" className="nav-link">Top Rated</Link></li>
            <li className="nav-item"><Link to="/movies/popular" className="nav-link">Popular</Link></li>
            <li className="nav-item"><Link to="/movies/upcoming" className="nav-link">Upcoming</Link></li>
            <li className="nav-item"><Link to="/food" className="nav-link">Food</Link></li>
          </ul>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleLogout}
            >
              Logout
            </button>
         
        </div>
      </div>
    </nav>
  );
};
