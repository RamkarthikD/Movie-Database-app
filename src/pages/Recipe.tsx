import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Meal {
  idMeal: string;
  strMeal: string;
  strInstructions: string;
  strMealThumb: string;
  [key: string]: any;
}


const Recipe: React.FC = () => {
  const [item, setItem] = useState<Meal | null>(null);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setItem(data.meals?.[0] || null);
      });
  }, [id]);

  const handleBack =()=>{
    navigate("/food");
  }

  return (
    <>
      {!item ? (
        "Not Found"
      ) : (
        <div className="recipeCard">
          <img
  src={item.strMealThumb}
  alt={item.strMeal}
  style={{ width: "300px", height: "auto",marginTop:"50px"}}
/>
          <h2>{item.strMeal}</h2>
          <p>{item.strInstructions}</p>
          <button onClick={handleBack}>Back</button>
        </div>
      )}
    </>
  );
};

export default Recipe;
