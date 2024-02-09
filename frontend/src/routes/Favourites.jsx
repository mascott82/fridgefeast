import React from 'react';
import '../styles/favourites.css';
import axios from 'axios';
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import CheckBox from './checkBoxFav';
import { useState } from "react";

/*
checkbox(selected items at form) -> 
Apply Filters (button) -> 
shoot query -> 
[Backend]-> 
query result -> 
render Favorites items 
*/

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
      <div><h4>Filters</h4></div>
      <div className="filter-group">
        <input type="text" placeholder="Search" className="filter-search"/>
      </div>
      <div className="filter-group">
        <h4>Dietary Concern</h4>
        {dietaryConcernsCheckbox}
      </div>
      <div className="filter-group">
        <h4>Cuisine</h4>
        {/* TODO : Add cuisine options here (If we have the data)*/}
      </div>
      <div className="filter-group">
        <h4>Time</h4>
        {cookTimesCheckbox}
      </div>
      <button type="submit" className="apply-filters">Apply Filters</button>
    </form>
  );
};

// TODO : Add scroll bar vertically (when its content is too long for the current viewable height)
// TODO : SORT BY function for the stored favourited items. 
// TODO : Update the style of recipe cards


const Favourites = ({userIdInfo}) => {
  const [qryFavs, setQryFavs] = useState([]);
  const [showIndex, setShowIndex] = useState(loadMoreCount);
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
        <div className="favourites-grid">
          {qryFavs.slice(0, showIndex).map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <div className="recipe-image">
                <img src={recipe.image} alt='recipe image'/>
              </div>
              <h3 className="recipe-name">{recipe.name}</h3>
              <p className="recipe-description">{recipe.description}</p>
              <p className="recipe-serving_size">serving for: {recipe.serving_size}</p>
            </div>
          ))}
        </div>
        <button className="load-more" onClick={()=>handleClickLoadMore()}>Load More</button>
      </div>
    </div>
  );
};

// TODO : Update the recipe card style with the HOMEPAGE. 


// const Favourites = () => {
//   const favoriteRecipes = new Array(6).fill(null).map((_, index) => ({
//     id: index,
//     title: "Loren Ipsum",
//     duration: "45 MIN",
//     servings: "SERVES 3"
//   }));

//   return (
//     <div className="favourites-container">
//       <div className="filter-section">
//         <FiltersMenu />
//       </div>
//       <div className="favourites-section">
//         <h2>FAVOURITES</h2>
//         <div className="favourites-grid">
//         <Col md={3}>
//             <Card className="recipe-card">
//               <Card.Img
//                 variant="top"
//                 className="recipe-card-img"
//                 src="src/assets/placeholder-img.jpg"
//                 alt="Title"
//               />
//               <Card.Body>
//                 <Card.Title>Recipe Name</Card.Title>
//                 <Card.Text>Short description of the recipe.</Card.Text>
//                 <Card.Text>45 Minutes | Serves: 3</Card.Text>
//               </Card.Body>
//             </Card>
//           </Col>
//         </div>
//         <button className="load-more">Load More</button>
//       </div>
//     </div>
//   );
// };

export default Favourites;