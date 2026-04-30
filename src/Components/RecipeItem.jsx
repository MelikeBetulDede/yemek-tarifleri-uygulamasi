import { useState } from "react";

function RecipeItem({ recipe, deleteRecipe, editHandler, toggleFavorite }) {
  const [showDetail, setShowDetail] = useState(false);

  const shortText = (text, limit = 120) => {
    if (!text) return "Belirtilmedi";
    return text.length > limit ? text.substring(0, limit) + "..." : text;
  };

  return (
    <div className="card h-100 shadow-sm border-0">
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h5 className="card-title text-success">{recipe.name}</h5>

          <button
            type="button"
            className="btn btn-sm btn-outline-warning"
            onClick={() => toggleFavorite(recipe.id)}
          >
            {recipe.favorite ? "⭐" : "☆"}
          </button>
        </div>

        <div className="mb-2">
          {recipe.categories?.map((category, index) => (
            <span key={index} className="badge bg-success me-1 mb-1">
              {category}
            </span>
          ))}
        </div>

        <p className="text-muted mb-2">⏱️ {recipe.time || "Belirtilmedi"} dk</p>

        <p>
          <b>Malzemeler:</b>{" "}
          {showDetail ? recipe.ingredients : shortText(recipe.ingredients)}
        </p>

        <p>
          <b>Yapılış:</b>{" "}
          {showDetail ? recipe.steps : shortText(recipe.steps)}
        </p>

        <button
          type="button"
          className="btn btn-outline-success btn-sm mb-3"
          onClick={() => setShowDetail(!showDetail)}
        >
          {showDetail ? "Detayı Gizle" : "Detay Göster"}
        </button>

        <div className="mt-auto d-flex gap-2">
          <button
            type="button"
            className="btn btn-warning btn-sm w-50"
            onClick={() => editHandler(recipe)}
          >
            Güncelle
          </button>

          <button
            type="button"
            className="btn btn-danger btn-sm w-50"
            onClick={() => deleteRecipe(recipe.id)}
          >
            Sil
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecipeItem;