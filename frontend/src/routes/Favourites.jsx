import React from 'react';
import '../styles/favourites.css';
import axios from 'axios';
import CheckBox from './checkBoxFav';
import { useState } from "react";
import FavouriteButton from '../components/FavouriteButton';

/*
checkbox(selected items at form) -> 
Apply Filters (button) -> 
shoot query -> 
[Backend]-> 
query result -> 
render Favorites items 
*/


const sortOptions = [
  { value: 'name_asc', text: 'Name (A to Z)' },
  { value: 'name_desc', text: 'Name (Z to A)' },
  { value: 'time_asc', text: 'Cook Time (Short to Long)' },
  { value: 'time_desc', text: 'Cook Time (Long to Short)' },
];


const loadMoreCount = 1

const FiltersMenu = ({setQryFavs, userId, initShowIndex}) => {
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
  // these Strings were used for recipe table's tags column, Case-sensitive and no whitespace at both side allowed
  // [Attention] if anything changed, update recipe table's tags column !!!
  const dietaryConcerns = ["Vegetarian", "Vegan", "Dairy-Free", "Gluten-Free", "Keto" , "Paleo"];
  const cookTimes = ["< 15 minutes","15 - 30 minutes", "30 - 45 minutes", "1 - 2 hours", "> 2 hours"];

  const dietaryConcernsCheckbox = dietaryConcerns.map((_text)=>{
    return (
    <CheckBox key={_text} boxName={_text} handleCheckboxChange={handleCheckboxChange} selectedItems={selectedItems}/>
    )});  
  const cookTimesCheckbox = cookTimes.map((_time)=>{return (
    <CheckBox key={_time} boxName={_time} handleCheckboxChange={handleCheckboxChange} selectedItems={selectedItems}/>
  )})


  const APIURL = 'http://0.0.0.0:3000/fav/list'

  // shoot query to DB
  const handleSubmit = (event) => {
    console.log("userId", userId)
    event.preventDefault();
    initShowIndex(loadMoreCount);
    axios.post(APIURL, {userid:userId}).then((response)=>{
      const returnedFavs = response.data.favs;
      // all favs as long as they have at least one of selectedItems in their tags
      let reducedFavs =[];
      if(selectedItems.length > 0){
        reducedFavs = returnedFavs.filter((_fav)=> _fav.tags.some(tag => selectedItems.includes(tag)));
      }else{
        reducedFavs = returnedFavs; // no filter -> select all
      }
      setQryFavs(reducedFavs);
      // TODO: if user did not add any new fav, skip Qry fro backend -> just go through filtering/sorting again
      // App.jsx level, if session cookie will be changed after adding a new fav, we can compare copy of previous session cookie and current session cookey
      // would be able to decide whether we need to POST request again.
    }).catch((error)=>{
      console.error('Error logging in:', error);
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


const Favourites = ({userIdInfo}) => {

  const [sortCriteria, setSortCriteria] = useState('name_asc');

  const [favourites, setFavourites] = useState([]);
  const toggleFavourite = (recipeId) => {
    if (favourites.includes(recipeId)) {
      setFavourites(favourites.filter(id => id !== recipeId));
    } else {
      setFavourites([...favourites, recipeId]);
    }
  };

  const [qryFavs, setQryFavs] = useState([]);
  const [showIndex, setShowIndex] = useState(loadMoreCount);

  const handleSortChange = (event) => {
    setSortCriteria(event.target.value);
  };
  const sortedFavs = qryFavs.slice().sort((a, b) => {
    switch (sortCriteria) {
      case 'name_asc':
        return a.name.localeCompare(b.name);
      case 'name_desc':
        return b.name.localeCompare(a.name);
      case 'time_asc':
        return a.cookTime - b.cookTime;
      case 'time_desc':
        return b.cookTime - a.cookTime;
      default:
        return 0;
    }
  });

  const handleClickLoadMore = () =>{    
    const newIndexEnd = showIndex + loadMoreCount;
    setShowIndex(newIndexEnd)
  };
  console.log("showIndex",showIndex)

  return (
    <div className="favourites-container">
      <div className="filter-section">
        <FiltersMenu setQryFavs={setQryFavs} userId={userIdInfo.userid} initShowIndex={setShowIndex}/>
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
          {qryFavs.slice(0, showIndex).map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <div className="fav-button-container"><FavouriteButton
                isFavourite={favourites.includes(recipe.id)}
                onClick={() => toggleFavourite(recipe.id)}/>
              </div>  
              <div className="recipe-image">
                <img src={recipe.image} alt='recipe image'/>
              </div>
              <h3 className="recipe-name">{recipe.name}</h3>
              <p className="recipe-description">{recipe.description}</p>
              <p className="recipe-serving_size">serving for: {recipe.serving_size}</p>
            </div>
          ))}
        </div>
        <div className="load-more-container"><button className="load-more" onClick={()=>handleClickLoadMore()}>Load More</button></div>
        
      </div>
    </div>
  );
};

export default Favourites;