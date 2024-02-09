import React from 'react';
import '../styles/favourites.css';

const CheckBox =({boxName})=>{
    return (
    <label className="filter-label">
          <input type="checkbox" /> {boxName}
    </label>
    );
}
export default CheckBox;