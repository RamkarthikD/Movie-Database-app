import React from 'react';
import { Link } from 'react-router-dom';

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  [key: string]: any;
}

interface Props {
  detail: Meal[] | null;
}

const Mealcards: React.FC<Props> = ({ detail }) => {
  return (
    <div className="meals">
      {!detail ? (
        "Sorry Data Not Found"
      ) : (
        detail.map((curItem) => (
          <div className="mealImg" key={curItem.idMeal}>
            <img src={curItem.strMealThumb} alt={curItem.strMeal} />
            <p>{curItem.strMeal}</p>
            <Link to={`/meal/${curItem.idMeal}`}>
              <button>Recipe</button>
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default Mealcards;
