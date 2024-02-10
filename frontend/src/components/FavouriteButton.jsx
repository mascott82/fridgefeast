import React, { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const FavouriteButton = ({ addNew, onClick }) => {
  if (addNew == undefined || addNew == null) {
    return (
      <button onClick={onClick} style={{ backgroundColor: 'white' }}>
        <FaHeart color="red" />
      </button>
    );
  } else {
    return (
      <button onClick={onClick} style={{ backgroundColor: 'white' }}>

        {addNew ? <FaHeart color="red" /> : <FaRegHeart />}
      </button>
    );
  }

};

export default FavouriteButton;

