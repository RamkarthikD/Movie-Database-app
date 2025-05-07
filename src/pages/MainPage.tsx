import React, { useEffect, useState } from 'react';
import Mealcards from './MealCard';

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  [key: string]: any;
}

const Mainpage: React.FC = () => {
  const [allMeals, setAllMeals] = useState<Meal[]>([]);
  const [search, setSearch] = useState<string>("");
  const [msg, setMsg] = useState<string>("");

  useEffect(() => {
    const fetchDefaultMeals = async () => {
      try {
        const res = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=");
        const json = await res.json();
        if (json.meals) {
          setAllMeals(json.meals);
          setMsg("");
        } else {
          setMsg("No meals available.");
        }
      } catch (error) {
        console.error("Default fetch error:", error);
        setMsg("Failed to load meals.");
      }
    };

    fetchDefaultMeals();
  }, []);

  const filteredMeals = allMeals.filter((meal) =>
    meal.strMeal.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <h1 className="head">FOOD RECIPE APP</h1>
      <div className="container">
        <div className="searchBar">
          <div className="mb-4 position-relative">
            <input
              type="text"
              className="form-control pe-5"
              placeholder="Enter Dish"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="btn btn-sm btn-light position-absolute"
                style={{
                  top: "50%",
                  right: "10px",
                  transform: "translateY(-50%)",
                  padding: "0 0.5rem",
                  border: "none",
                }}
              >
                ×
              </button>
            )}
          </div>
        </div>

        {filteredMeals.length > 0 ? (
          <Mealcards detail={filteredMeals} />
        ) : (
          <h4 className="msg">No meals found for "{search}".</h4>
        )}
      </div>
    </>
  );
};

export default Mainpage;
