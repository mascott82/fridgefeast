import React, { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const FavouriteButton = ({ isFavourite, onClick }) => {
  return (
    <button onClick={onClick} style={{ backgroundColor: 'white' }}>
      {isFavourite ? <FaHeart color="red" /> : <FaRegHeart />}
    </button>
  );
};

export default FavouriteButton;

