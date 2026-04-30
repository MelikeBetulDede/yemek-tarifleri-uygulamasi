import RecipeItem from "./RecipeItem";

function RecipeList({ recipes, deleteRecipe, editHandler, toggleFavorite }) {
  return (
    <div>
      <h4 className="mb-3">📋 Tarif Listesi</h4>

      {recipes.length === 0 ? (
        <div className="alert alert-warning">
          Aradığın kritere uygun tarif bulunamadı.
        </div>
      ) : (
        <div className="row">
          {recipes.map((recipe) => (
            <div className="col-md-6 col-lg-4 mb-4" key={recipe.id}>
              <RecipeItem
                recipe={recipe}
                deleteRecipe={deleteRecipe}
                editHandler={editHandler}
                toggleFavorite={toggleFavorite}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RecipeList;