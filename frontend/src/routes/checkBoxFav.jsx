import React from 'react';
import '../styles/favourites.css';

const CheckBox =({boxName, handleCheckboxChange, selectedItems})=>{
    return (
    <label className="filter-label">
          <input type="checkbox" value={boxName} onChange={handleCheckboxChange} checked={selectedItems.includes(boxName)}/> {boxName}
    </label>
    );
}
export default CheckBox;