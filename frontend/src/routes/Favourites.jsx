import React from 'react';
import '../styles/favourites.css';
import axios from 'axios';
import CheckBox from './checkBoxFav';
import { useState, useEffect } from "react";
import FavouriteButton from '../components/FavouriteButton';
import { useNavigate } from "react-router-dom";
import RecipeCard from '../components/RecipeCard';
import { Container, Row, Col, Card, Button } from "react-bootstrap"


const sortOptions = [
  { value: 'time_asc', text: 'Cook Time (Short to Long)' },
  { value: 'time_desc', text: 'Cook Time (Long to Short)' },
];

const loadMoreCount = 3

const dietaryConcerns = {
  "Vegetarian": { "path": ["vegatarian"], "check_type": "field", "check_value": "" },
  "Vegan": { "path": ["vegan"], "check_type": "field", "check_value": "" },
  "Dairy-Free": { "path": ["dairyFree"], "check_type": "field", "check_value": "" },
  "Gluten-Free": { "path": ["glutenFree"], "check_type": "field", "check_value": "" },
  "Keto": { "path": ["diets"], "check_type": "array", "check_value": "ketogenic" },
  "Paleo": { "path": ["diets"], "check_type": "array", "check_value": "paleolithic" }
};
const cookTimes = {
  "< 15 minutes": [0, 15],
  "15 - 30 minutes": [15, 30],
  "30 - 60 minutes": [30, 60],
  "1 - 2 hours": [60, 120],
  "> 2 hours": [120, 864000]
};
const backend_endpoint_user_fav = 'http://0.0.0.0:3000/fav/list'
const backend_endpoint_user_fav_delete = 'http://0.0.0.0:3000/fav/delete'



const FiltersMenu = ({ setFilterConditionsTimes }) => {
  // collect user condition seletction
  // click submit -> update the condition to some state in the Favourites
  const [selectedConditions, setSelectedConditions] = useState({});
  const [selectedTimes, setSelectedTimes] = useState({});

  const handleCheckboxChangeCondition = (event) => {
    const { value, checked } = event.target;
    setSelectedConditions(prev => {
      if (checked) {
        return { ...prev, [value]: dietaryConcerns[value] };
      } else {
        const { [value]: _, ...rest } = prev;
        return rest
      }
    });
  };
  const handleCheckboxChangeTime = (event) => {
    const { value, checked } = event.target;
    setSelectedTimes(prev => {
      if (checked) {
        return { ...prev, [value]: cookTimes[value] };
      } else {
        const { [value]: _, ...rest } = prev;
        return rest
      }
    });
  };

  const dietaryConcernsCheckbox = Object.keys(dietaryConcerns).map((_text) => {
    return (
      <CheckBox key={_text} boxName={_text} handleCheckboxChange={handleCheckboxChangeCondition} selected={selectedConditions} />
    )
  });
  const cookTimesCheckbox = Object.keys(cookTimes).map((_time) => {
    return (
      <CheckBox key={_time} boxName={_time} handleCheckboxChange={handleCheckboxChangeTime} selected={selectedTimes} />
    )
  })
  const handleSubmit = (event) => {
    event.preventDefault();
    // selected conditions and times to state
    setFilterConditionsTimes({ "conditions": Object.values(selectedConditions), "times": Object.values(selectedTimes) })
  }
  return (
    <form className="filter-menu" onSubmit={handleSubmit}>
      <div><h4>Filters</h4></div> <br></br>
      <div className="filter-group">
        <h4>Dietary Concern</h4>
        {dietaryConcernsCheckbox}
      </div>
      <div className="filter-group">
        <h4>Time</h4>
        {cookTimesCheckbox}
      </div>
      <button type="submit" className="apply-filters">Apply Filters</button>
    </form>
  );
};


const LoadingRecipes = ({ userid, userFavRecipes, setUserFavRecipes, setRecipesFromApi }) => {
  const [isLoading, setIsLoading] = useState(true);
  // download all recipe ids of current user from favorites table in DB
  useEffect(() => {
    const getUserFavs = async () => {
      try {
        const response = await axios.post(backend_endpoint_user_fav, { userid: userid })
        setUserFavRecipes(response.data.favs)
      } catch (error) {
        console.error("Error fetching fav:", error)
      }
    }
    getUserFavs()
  }, [])

  // download all recipe info 
  useEffect(() => {
    const fetchAllRecipes = async () => {
      if (userFavRecipes.length === 0) return;

      setIsLoading(true);
      const fetchPromises = userFavRecipes.map(async (fav, index) => {
        try {
          const response = await axios.get(`http://localhost:3000/recipes/${fav.recipe_id}/information`);
          return { id: fav.recipe_id, data: response.data };
        } catch (error) {
          console.error("Error fetching recipe:", error);
          return null;
        }
      });

      // Wait for all fetches to complete
      const results = await Promise.allSettled(fetchPromises);
      results.forEach(result => {
        if (result) {
          setRecipesFromApi(prev => ({ ...prev, [result.value.id]: result.value.data }));
        }
      });
      setIsLoading(false); // End loading after all requests
    };

    fetchAllRecipes();
  }, [userFavRecipes]); // Dependency on userFavRecipes ensures this runs after they're set
  return (<></>)
}

const Favourites = ({ userIdAuthToken }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userFavRecipes, setUserFavRecipes] = useState([])
  const [recipesFromApi, setRecipesFromApi] = useState({})
  const [filterConditionsTimes, setFilterConditionsTime] = useState({ "conditions": [], "times": [] })

  // apply user's conditions
  const filterRecipes = (_recipes, _conditions, _times) => {
    const _recipesFilteredCondition = _recipes.filter((_recipe) => {
      if (_conditions.length == 0) {
        return true;
      }
      let selected = false;
      for (const [key, value] of Object.entries(_conditions)) {
        const _queryCondition = value["path"].reduce((acc, key) => acc[key], _recipe)
        if (value["check_type"] == "array") {
          if (_queryCondition.includes(value["check_value"])) {
            selected = true;
            break;
          }
        } else {
          if (_queryCondition) {
            selected = true;
            break;
          }
        }
      }
      return selected;
    })
    const _recipesFilteredTime = _recipesFilteredCondition.filter((_recipe) => {
      if (_times.length == 0) {
        return true;
      }
      let selected = false;
      for (const [key, value] of Object.entries(_times)) {
        const minTimeMinute = value[0];
        const maxTimeMinute = value[1];
        console.log("time check", minTimeMinute, _recipe["readyInMinutes"], maxTimeMinute)
        if (minTimeMinute < _recipe["readyInMinutes"] && _recipe["readyInMinutes"] <= maxTimeMinute) {
          selected = true;
          break;
        }
      }
      return selected;
    })
    return _recipesFilteredTime;
  }

  const [sortCriteria, setSortCriteria] = useState('time_asc');

  // qryFavs = Array[{recipe object},...]
  const [qryFavs, setQryFavs] = useState([]);
  const [showIndex, setShowIndex] = useState(loadMoreCount);
  const navigate = useNavigate()

  const goToSingleRecipe = (recipeId) => {
    setTimeout(() => {
      navigate(`/recipes/${recipeId}`)
    }, 100)
  };

  // const DeleteFav = (recipeId) => {
  //   const deleteTarget = { userid: userIdAuthToken.userid, recipeid: recipeId };
  //   axios.post(backend_endpoint_user_fav_delete, deleteTarget).then((response) => {
  //     const removedFavQty = response.data.removed_fav_qty;
  //     console.log("removedFavQty", removedFavQty)
  //   }).catch((error) => {
  //     console.error('Error fav recipe query:', error);
  //   })
  //   window.location.reload();
  //   return (<></>)
  // }

  const handleSortChange = (event) => {
    setSortCriteria(event.target.value);
  };

  const sortedFavs = (_favs, _sortCodition) => {
    const _sortedResult = _favs.sort((a, b) => {
      switch (_sortCodition) {
        case 'time_asc':
          return a.readyInMinutes - b.readyInMinutes;
        case 'time_desc':
          return b.readyInMinutes - a.readyInMinutes;
        default:
          return 0;
      }
    });
    return _sortedResult;
  };

  const handleClickLoadMore = () => {
    const newIndexEnd = showIndex + loadMoreCount;
    setShowIndex(newIndexEnd)

  };

  return (
    <div className="favourites-container">
      <LoadingRecipes userid={userIdAuthToken.userid} userFavRecipes={userFavRecipes} setUserFavRecipes={setUserFavRecipes} setRecipesFromApi={setRecipesFromApi} />
      <div className="filter-section">
        <FiltersMenu setFilterConditionsTimes={setFilterConditionsTime} />
      </div>
      <div className="favourites-section">
        <h2>FAVOURITES</h2>
        <div className="sortby-container">
          <div className="sort-by-dropdown">
            <label htmlFor="sortby">Sort By:</label>
            <select id="sortby" onChange={handleSortChange} value={sortCriteria}>
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.text}
                </option>
              ))}
            </select>
          </div>
        </div>
        <br></br>
        <div className="favourites-grid">
          <Row>
            {sortedFavs(filterRecipes(Object.values(recipesFromApi), filterConditionsTimes["conditions"], filterConditionsTimes["times"]), sortCriteria).slice(0, showIndex).map((recipe) => (
              <Col md={4} key={recipe.id}>
                <Card className="recipe-card-fav">
                <div className="fav-button-container"><FavouriteButton
                    addNew={false} userid={userIdAuthToken.userid} recipeid={recipe.id}
                    />
                  </div>
                  <div onClick={() => goToSingleRecipe(recipe.id)}>                  
                    <Card.Img
                      variant="top"
                      className="recipe-card-img"
                      src={recipe.image}
                      alt={recipe.title}
                    />
                    <Card.Body>
                      <Card.Title>{recipe.title}</Card.Title>
                      <Card.Text>
                        {recipe.readyInMinutes} minutes | Serving Size:{" "}
                        {recipe.servings}
                      </Card.Text>
                    </Card.Body>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
        <div className="load-more-container"><button className="load-more" onClick={() => handleClickLoadMore()}>Load More</button></div>

      </div>
    </div>
  );
};

export default Favourites;

{/* <div className="favourites-grid">
{sortedFavs(qryFavs, sortCriteria).slice(0, showIndex).map((recipe) => (
  <div key={recipe.id} className="recipe-card">
    <div className="fav-button-container"><FavouriteButton
      addNew={null}
      onClick={() => {
        DeleteFav(recipe.id);
        selectFavToRemove(recipe.id);
        console.log("should be removed from DB")
        // remove it from table in DB
      }
      } />
    </div>
    <div className='recipe-image-text' onClick={() => handleItemClick(recipe)}>
      <div className="recipe-image">
        <img src={recipe.image} alt='recipe image' />
      </div>
      <h3 className="recipe-name">{recipe.name}</h3>
      <p className="recipe-description">{recipe.description}</p>
      <p className="recipe-serving_size">serving for: {recipe.serving_size}</p>
      <p className="recipe-cook_time">cook time: {selectTimeFromTags(recipe.tags)}</p>
    </div>
  </div>
))}
</div> */}