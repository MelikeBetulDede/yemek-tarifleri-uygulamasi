import { useEffect, useState } from "react";
import RecipeForm from "../Components/RecipeForm";
import RecipeList from "../Components/RecipeList";

function Home() {
  const [recipes, setRecipes] = useState(() => {
    const saved = localStorage.getItem("recipes");
    return saved ? JSON.parse(saved) : [];
  });

  const [editRecipe, setEditRecipe] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tümü");

  useEffect(() => {
    localStorage.setItem("recipes", JSON.stringify(recipes));
  }, [recipes]);

  const addRecipe = (recipe) => {
    if (editRecipe) {
      setRecipes(recipes.map((r) => (r.id === editRecipe.id ? recipe : r)));
      setEditRecipe(null);
    } else {
      setRecipes([...recipes, recipe]);
    }
  };

  const deleteRecipe = (id) => {
    setRecipes(recipes.filter((recipe) => recipe.id !== id));
  };

  const editHandler = (recipe) => {
    setEditRecipe(recipe);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleFavorite = (id) => {
    setRecipes(
      recipes.map((recipe) =>
        recipe.id === id ? { ...recipe, favorite: !recipe.favorite } : recipe
      )
    );
  };

  const allCategories = Array.from(
    new Set(recipes.flatMap((recipe) => recipe.categories || []))
  );

  const filterOptions = ["Tümü", "Favoriler", ...allCategories];

  // 🔥 SADECE İSİME GÖRE ARAMA
  const search = searchText.trim().toLowerCase();

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch = recipe.name
      ?.toLowerCase()
      .includes(search);

    const matchesCategory =
      selectedCategory === "Tümü" ||
      (selectedCategory === "Favoriler" && recipe.favorite) ||
      recipe.categories?.includes(selectedCategory);

    return matchesSearch && matchesCategory;
  });

  // ⭐ FAVORİLER ÜSTTE
  const sortedRecipes = [...filteredRecipes].sort(
    (a, b) => Number(b.favorite) - Number(a.favorite)
  );

  const favoriteCount = recipes.filter((recipe) => recipe.favorite).length;

  return (
    <div className="min-vh-100 bg-light">
      <div className="bg-success text-white py-5 mb-4">
        <div className="container text-center">
          <h1 className="display-5 fw-bold">🍽️ Yemek Tarifleri Uygulaması</h1>
          <p className="lead mb-0">
            Sevdiğin tarifleri ekle, düzenle, favorilere al ve kolayca ara.
          </p>
        </div>
      </div>

      <div className="container pb-5">
        <div className="row mb-4">
          <div className="col-md-6 mb-3">
            <div className="card shadow-sm border-0 text-center p-3">
              <h5 className="text-muted">Toplam Tarif</h5>
              <h2 className="text-success">{recipes.length}</h2>
            </div>
          </div>

          <div className="col-md-6 mb-3">
            <div className="card shadow-sm border-0 text-center p-3">
              <h5 className="text-muted">Favori Tarif</h5>
              <h2 className="text-warning">{favoriteCount}</h2>
            </div>
          </div>
        </div>

        <RecipeForm addRecipe={addRecipe} editRecipe={editRecipe} />

        <div className="card shadow-sm border-0 p-4 mb-4">
          <h4 className="mb-3">🔎 Tariflerde Ara ve Filtrele</h4>

          <div className="row">
            <div className="col-md-8 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Sadece tarif adına göre ara..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>

            <div className="col-md-4 mb-3">
              <select
                className="form-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {filterOptions.map((category, index) => (
                  <option key={index} value={category}>
                    {category === "Favoriler" ? "⭐ Favoriler" : category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <RecipeList
          recipes={sortedRecipes}
          deleteRecipe={deleteRecipe}
          editHandler={editHandler}
          toggleFavorite={toggleFavorite}
        />
      </div>
    </div>
  );
}

export default Home;