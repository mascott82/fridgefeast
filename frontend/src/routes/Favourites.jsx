import React from 'react';
import '../styles/favourites.css';
import axios from 'axios';
import CheckBox from './checkBoxFav';
import { useState } from "react";
import FavouriteButton from '../components/FavouriteButton';
import { useNavigate } from "react-router-dom"


const sortOptions = [
  { value: 'time_asc', text: 'Cook Time (Short to Long)' },
  { value: 'time_desc', text: 'Cook Time (Long to Short)' },
];

const loadMoreCount = 5

const dietaryConcerns = ["Vegetarian", "Vegan", "Dairy-Free", "Gluten-Free", "Keto", "Paleo"];
const cookTimes = ["< 15 minutes", "15 - 30 minutes", "30 - 45 minutes", "1 - 2 hours", "> 2 hours"];
const APIURL = 'http://0.0.0.0:3000/fav/list'
const APIURL_DELETE = 'http://0.0.0.0:3000/fav/delete'

const FiltersMenu = ({ setQryFavs, userId, initShowIndex }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  console.log("selectedItems ", selectedItems)
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setSelectedItems(prev => {
      if (checked) {
        return [...prev, value];
      } else {
        return prev.filter(item => item !== value);
      }
    });
  };

  const dietaryConcernsCheckbox = dietaryConcerns.map((_text) => {
    return (
      <CheckBox key={_text} boxName={_text} handleCheckboxChange={handleCheckboxChange} selectedItems={selectedItems} />
    )
  });
  const cookTimesCheckbox = cookTimes.map((_time) => {
    return (
      <CheckBox key={_time} boxName={_time} handleCheckboxChange={handleCheckboxChange} selectedItems={selectedItems} />
    )
  })




  // shoot query to DB
  const handleSubmit = (event) => {
    console.log("userId", userId)
    event.preventDefault();
    initShowIndex(loadMoreCount);
    axios.post(APIURL, { userid: userId }).then((response) => {
      const returnedFavs = response.data.favs;
      // all favs as long as they have at least one of selectedItems in their tags
      let reducedFavs = [];
      if (selectedItems.length > 0) {
        reducedFavs = returnedFavs.filter((_fav) => _fav.tags.some(tag => selectedItems.includes(tag)));
      } else {
        reducedFavs = returnedFavs; // no filter -> select all
      }
      setQryFavs(reducedFavs);
    }).catch((error) => {
      console.error('Error fav recipe query:', error);
    })
  };

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


const Favourites = ({ userIdInfo, selectRecipe }) => {
  const timeStringToNumericMap = Object.fromEntries(cookTimes.map((value, index) => [value, index]));
  const [sortCriteria, setSortCriteria] = useState('time_asc');

  // qryFavs = Array[{recipe object},...]
  const [qryFavs, setQryFavs] = useState([]);
  const [showIndex, setShowIndex] = useState(loadMoreCount);
  // initShow == true, show all user's fav recipe
  // any checkBox click -> set initShow to false
  const [initShow, setInitShow] = useState(true);


  const navigate = useNavigate()

  const goToSingleRecipe = () => {
    setTimeout(() => {
      navigate("/single_recipe")
    }, 500)
  };


  const RunInitShow = () => {
    // console.log("initShow", initShow)
    if (initShow) {
      axios.post(APIURL, { userid: userIdInfo.userid }).then((response) => {
        const returnedFavs = response.data.favs;
        // all fav recipes loaded
        setQryFavs(returnedFavs);
        setInitShow(false);
      }).catch((error) => {
        console.error('Error fav recipe query:', error);
      })
    }
    return (<>
    </>
    )
  };

  const DeleteFav = (recipeId) =>{
    console.log("DeleteFav called: userid, recipeid", userIdInfo.userid, recipeId)
    axios.post(APIURL_DELETE, { userid: userIdInfo.userid, recipeid: recipeId }).then((response) => {
      const removedFavQty = response.data.removed_fav_qty;
      console.log("removedFavQty", removedFavQty)
    }).catch((error) => {
      console.error('Error fav recipe query:', error);
    })
    return (<></>)
  }

  const selectFavToRemove = (recipeId) => {
    setQryFavs(qryFavs.filter(_recipe => _recipe.id !== recipeId));
  };

  const handleSortChange = (event) => {
    setSortCriteria(event.target.value);
  };

  const sortedFavs = (_favs, _sortCodition) => {
    const _sortedResult = _favs.sort((a, b) => {
      switch (_sortCodition) {
        case 'time_asc':
          return timeStringToNumericMap[selectTimeFromTags(a.tags)] - timeStringToNumericMap[selectTimeFromTags(b.tags)]
        case 'time_desc':
          return timeStringToNumericMap[selectTimeFromTags(b.tags)] - timeStringToNumericMap[selectTimeFromTags(a.tags)];
        default:
          return 0;
      }
    });
    return _sortedResult;
  };
  const selectTimeFromTags = (_tags) => {
    const result = _tags.filter(_e => _e.includes("hour") || _e.includes("minute"));
    if (result.length > 0) {
      return result[0];
    }
    return [];
  }
  const handleClickLoadMore = () => {
    const newIndexEnd = showIndex + loadMoreCount;
    setShowIndex(newIndexEnd)
  };
  console.log("showIndex", showIndex)

  const handleItemClick = (recipeInfo) => {
    // update select recipe to state
    const reMapRecipeInfo = {
      id: recipeInfo.id,
      name: recipeInfo.name,
      image: recipeInfo.image,
      servingSize: `${recipeInfo.serving_size} servings`,
      timeToMake: selectTimeFromTags(recipeInfo.tags),
      ingredients: recipeInfo.ingredients,
      directions: recipeInfo.directions,
    }
    selectRecipe(reMapRecipeInfo)
    // redirect
    goToSingleRecipe()
  };

  // 1. user's fav recipes download from qry
  // 2. by changing sort or filtering condition via checkbox, the conditions would be stored at state
  // 3. at rendering moment, it applies the sorte sort/filtering state to downloaded fav recipes
  return (
    <div className="favourites-container">
      <RunInitShow />
      <div className="filter-section">
        <FiltersMenu setQryFavs={setQryFavs} userId={userIdInfo.userid} initShowIndex={setShowIndex} />
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
        </div>
        <div className="load-more-container"><button className="load-more" onClick={() => handleClickLoadMore()}>Load More</button></div>

      </div>
    </div>
  );
};

export default Favourites;