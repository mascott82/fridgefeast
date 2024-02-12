import React from 'react';
import '../styles/favourites.css';

const CheckBox =({boxName, handleCheckboxChange, selected})=>{
    return (
    <label className="filter-label">
          <input type="checkbox" value={boxName} onChange={handleCheckboxChange} checked={boxName in selected}/> {boxName}
    </label>
    );
}
export default CheckBox;