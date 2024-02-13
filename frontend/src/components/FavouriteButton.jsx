import React, {useEffect, useState} from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import axios from 'axios';
const backend_endpoint_user_fav_delete = 'http://0.0.0.0:3000/fav/delete'
const backend_endpoint_user_fav_add = 'http://0.0.0.0:3000/fav/add'

const FavouriteButton = ({ addNew, userid, recipeid, setDeletedRecipe }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFavorited, setIsFavorited] = useState(!addNew);
  
  useEffect(() => {
    setIsFavorited(!addNew);
  }, []);

  const clickAction =() => {
    setIsLoading(true);

    const userRecipeTarget = { userid: userid, recipeid: recipeid };
    const url = (addNew ? backend_endpoint_user_fav_add : backend_endpoint_user_fav_delete)

    axios.post(url, userRecipeTarget).then((response) => {
      const qty = response.data.qty;
      console.log("change-fav-qty", qty);
      setIsFavorited(!isFavorited); 
      setIsLoading(false);
    }).catch((error) => {
      console.error('Error fav recipe query:', error);
      setIsLoading(false);
    });  
    if (!addNew){
      setDeletedRecipe(recipeid);
    }  
  };

  return (
    <button onClick={clickAction} style={{ backgroundColor: 'white' }} disabled={isLoading}>
      {isLoading ? 'Loading...' : (isFavorited ? <FaHeart color="red" /> : <FaRegHeart />)}
    </button>
  );
};

export default FavouriteButton;
