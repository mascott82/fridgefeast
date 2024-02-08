import React from 'react';
import '../styles/favourites.css';
import axios from 'axios';
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

const FiltersMenu = () => {
  return (
    <form className="filter-menu">
      <div><h4>Filters</h4></div>
      <div className="filter-group">
        <input type="text" placeholder="Search" className="filter-search"/>
      </div>
      <div className="filter-group">
        <h4>Dietary Concern</h4>
        <label className="filter-label">
          <input type="checkbox" /> Vegetarian
        </label>
        <label className="filter-label">
          <input type="checkbox" /> Vegan
        </label>
        <label className="filter-label">
          <input type="checkbox" /> Dairy-Free
        </label>
        <label className="filter-label">
          <input type="checkbox" /> Gluten-Free
        </label>
        <label className="filter-label">
          <input type="checkbox" /> Keto
        </label>
        <label className="filter-label">
          <input type="checkbox" /> Paleo
        </label>
      </div>
      <div className="filter-group">
        <h4>Cuisine</h4>
        {/* TODO : Add cuisine options here (If we have the data)*/}
      </div>
      <div className="filter-group">
        <h4>Time</h4>
        <label className="filter-label">
          <input type="checkbox" /> {'< 15 minutes'}
        </label>
        <label className="filter-label">
          <input type="checkbox" /> {'15 - 30 minutes'}
        </label>
        <label className="filter-label">
          <input type="checkbox" /> {'30 - 45 minutes'}
        </label>
        <label className="filter-label">
          <input type="checkbox" /> {'1 - 2 hours'}
        </label>
        <label className="filter-label">
          <input type="checkbox" /> {'> 2 hours'}
        </label>
      </div>
      <button type="submit" className="apply-filters">Apply Filters</button>
    </form>
  );
};

// TODO : Add scroll bar vertically (when its content is too long for the current viewable height)
// TODO : SORT BY function for the stored favourited items. 
// TODO : Update the style of recipe cards


const Favourites = () => {
  const favoriteRecipes = new Array(6).fill(null).map((_, index) => ({
    id: index,
    title: "Loren Ipsum",
    duration: "45 MIN",
    servings: "SERVES 3"
  }));

  return (
    <div className="favourites-container">
      <div className="filter-section">
        <FiltersMenu />
      </div>
      <div className="favourites-section">
        <h2>FAVOURITES</h2>
        <div className="favourites-grid">
          {favoriteRecipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <div className="recipe-image"></div>
              <h3 className="recipe-title">{recipe.title}</h3>
              <p className="recipe-info">{recipe.duration} · {recipe.servings}</p>
            </div>
          ))}
        </div>
        <button className="load-more">Load More</button>
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