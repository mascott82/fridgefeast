import { FaHeart, FaRegHeart } from 'react-icons/fa';
import axios from 'axios';
const backend_endpoint_user_fav_delete = 'http://0.0.0.0:3000/fav/delete'
const backend_endpoint_user_fav_add = 'http://0.0.0.0:3000/fav/add'

const FavouriteButton = ({ addNew, userid, recipeid}) => {
  const clickAction =() => {
    const userRecipeTarget = { userid: userid, recipeid: recipeid };
    const url = (addNew ? backend_endpoint_user_fav_add : backend_endpoint_user_fav_delete)
    axios.post(url, userRecipeTarget).then((response) => {
      const qty = response.data.qty;
      console.log("change-fav-qty", qty)
    }).catch((error) => {
      console.error('Error fav recipe query:', error);
    })
    window.location.reload();
  }
  return (
    <button onClick={clickAction} style={{ backgroundColor: 'white' }}>
      {addNew ?  <FaRegHeart /> : <FaHeart color="red" /> }
    </button>
  );
};

export default FavouriteButton;

