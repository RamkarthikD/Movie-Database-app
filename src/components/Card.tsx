import { Link } from "react-router-dom";

interface CardProps {
  title: string;
  overview: string;
  imageUrl: string;
  linkUrl: string;
}

export const Card: React.FC<CardProps> = ({title,overview,imageUrl,linkUrl,}) => {
  return (
    <div className="col">
      <div className="card">
        <img src={imageUrl} alt={title} className="card-img-top" />
        <div className="card-body">
          <h5>{title}</h5>
          <p className="card-text">{overview}</p>
          <div>
            <Link to={`/movie/${linkUrl}`}>Read More</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
