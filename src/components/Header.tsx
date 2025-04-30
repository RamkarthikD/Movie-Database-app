import { useNavigate, Link } from "react-router-dom";
import { FormEvent } from "react";

export const Header = () => {
  const navigate = useNavigate();

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const input = form.elements.namedItem("search") as HTMLInputElement;
    const queryTerm = input.value.trim();

    form.reset();

    if (queryTerm) {
      navigate(`/search?q=${queryTerm}`);
    }
  };

  return (
    <nav className="navbar navbar-expand-md fixed-top bg-primary">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">MovieHunt</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto ">
            <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
            <li className="nav-item"><Link to="/movies/top" className="nav-link">Top Rated</Link></li>
            <li className="nav-item"><Link to="/movies/popular" className="nav-link">Popular</Link></li>
            <li className="nav-item"><Link to="/movies/upcoming" className="nav-link">Upcoming</Link></li>
          </ul>
          <form onSubmit={handleSearch}>
            <input name="search" type="search" className="form-control" placeholder="Search" />
          </form>
        </div>
      </div>
    </nav>
  );
};
