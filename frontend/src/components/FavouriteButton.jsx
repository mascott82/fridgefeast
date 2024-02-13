// import { useState } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import axios from 'axios';
const backend_endpoint_user_fav_delete = 'http://0.0.0.0:3000/fav/delete'
const backend_endpoint_user_fav_add = 'http://0.0.0.0:3000/fav/add'

const FavouriteButton = ({ addNew, userid, recipeid}) => {
  
  // const [isFavorited, setIsFavorited] = useState(addNew);

  const clickAction =() => {
    const userRecipeTarget = { userid: userid, recipeid: recipeid };

    // const url = (isFavorited ? backend_endpoint_user_fav_add : backend_endpoint_user_fav_delete)
    const url = (addNew ? backend_endpoint_user_fav_add : backend_endpoint_user_fav_delete)
    axios.post(url, userRecipeTarget).then((response) => {
      const qty = response.data.qty;
      console.log("change-fav-qty", qty)
      // setIsFavorited(!isFavorited);
      window.location.reload()
    }).catch((error) => {
      console.error('Error fav recipe query:', error);
    })
  }

  return (
    // <div>
    //   {isFavorited ?  <FaRegHeart onClick={clickAction}/> : <FaHeart color="red" onClick={clickAction}/> }
    // </div>
    <button onClick={clickAction} style={{ backgroundColor: 'white' }}>
      {addNew ?  <FaRegHeart /> : <FaHeart color="red" /> }
    </button>
  );
};

export default FavouriteButton;

