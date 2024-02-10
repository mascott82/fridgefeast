const RecipeCard = ({ recipe }) => {
  return (
    <div className="recipe-card">
      <img src={recipe.image}></img>
      <div className="recipe-card-title">
        <h3>{recipe.title}</h3>
      </div>
    </div>
  )
}

export default RecipeCard
